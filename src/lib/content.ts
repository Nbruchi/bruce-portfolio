import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { codeToHtml, type ShikiTransformer } from "shiki";
import { z } from "zod";

import { getReadingTime } from "./reading-time";

const WORK_DIR = path.join(process.cwd(), "content", "work");
const WRITING_DIR = path.join(process.cwd(), "content", "writing");

const workFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  timeframe: z.string(),
  stack: z.array(z.string()).min(1),
  liveUrl: z.url().optional(),
  liveLinkLabel: z.string().optional(),
  repoUrl: z.url().optional(),
  figures: z.array(z.string()).min(1),
  built: z.string(),
  proves: z.string(),
  order: z.number().int(),
  featured: z.boolean(),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;

const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.iso.date("date must be an ISO date (YYYY-MM-DD)"),
  draft: z.boolean(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type WorkItem = { slug: string; frontmatter: WorkFrontmatter };
export type PostItem = { slug: string; frontmatter: PostFrontmatter; readingTime: number };

// The `pre` override handed to every `compileMDX` call so Shiki highlighting
// applies wherever MDX content is rendered, without every caller repeating it.
// The visual treatment (surface-code background, radius, scroll) is layered
// on top by the content components in feature 05 — this only produces the
// highlighted markup.
type CodeElement = ReactElement<{ className?: string; children?: string }>;

// Shiki's theme sets an inline background/text color on the generated `<pre>`
// so it renders correctly standalone — but `ui-rules.md` requires the code
// surface to be the fixed `--surface-code` token, not whatever hex the
// "github-dark" theme happens to use. Stripping the inline style and adding
// the token-backed utility classes here (rather than in a component override)
// keeps this the one place that knows about Shiki's output shape.
const codeBlockTransformer: ShikiTransformer = {
  pre(node) {
    delete node.properties.style;
    this.addClassToHast(node, "overflow-x-auto rounded-lg bg-surface-code p-4 text-small text-text-primary");
  },
};

async function CodeBlock({ children }: { children: CodeElement }): Promise<ReactElement> {
  const className = children.props.className ?? "";
  const lang = className.replace("language-", "") || "text";
  const code = children.props.children ?? "";
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
    transformers: [codeBlockTransformer],
  });
  return createElement("div", { dangerouslySetInnerHTML: { __html: html } });
}

type MDXComponents = NonNullable<Parameters<typeof compileMDX>[0]["components"]>;

function readSlugs(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readFrontmatter<T>(
  dir: string,
  slug: string,
  schema: z.ZodType<T>,
): { frontmatter: T; content: string } {
  const filePath = path.join(dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);

  if (!result.success) {
    const relativePath = path.relative(process.cwd(), filePath);
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${relativePath}:\n${issues}`);
  }

  return { frontmatter: result.data, content };
}

export function getAllWork(): WorkItem[] {
  return readSlugs(WORK_DIR)
    .map((slug) => ({
      slug,
      frontmatter: readFrontmatter(WORK_DIR, slug, workFrontmatterSchema).frontmatter,
    }))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAllPosts(): PostItem[] {
  const isProduction = process.env.NODE_ENV === "production";

  return readSlugs(WRITING_DIR)
    .map((slug) => {
      const { frontmatter, content } = readFrontmatter(WRITING_DIR, slug, postFrontmatterSchema);
      return { slug, frontmatter, readingTime: getReadingTime(content) };
    })
    .filter((post) => !isProduction || !post.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getWorkBySlug(
  slug: string,
  components?: MDXComponents,
): Promise<{ frontmatter: WorkFrontmatter; content: ReactElement }> {
  const { frontmatter, content } = readFrontmatter(WORK_DIR, slug, workFrontmatterSchema);
  const { content: compiled } = await compileMDX<WorkFrontmatter>({
    source: content,
    // blockJS defaults to true (next-mdx-remote 6+) and strips every `{expression}`
    // JSX attribute, not just executable code — that includes the numeric
    // `width`/`height` props next/image requires and array props like
    // `StackChips`'s `stack`. Content here is authored solely by Bruce and
    // versioned in the repo, so it's safe to allow; blockDangerousJS stays on.
    options: { parseFrontmatter: false, blockJS: false },
    components: { pre: CodeBlock, ...components },
  });

  return { frontmatter, content: compiled };
}

export async function getPostBySlug(
  slug: string,
  components?: MDXComponents,
): Promise<{ frontmatter: PostFrontmatter; content: ReactElement; readingTime: number }> {
  const { frontmatter, content } = readFrontmatter(WRITING_DIR, slug, postFrontmatterSchema);
  const readingTime = getReadingTime(content);
  const { content: compiled } = await compileMDX<PostFrontmatter>({
    source: content,
    options: { parseFrontmatter: false, blockJS: false },
    components: { pre: CodeBlock, ...components },
  });

  return { frontmatter, content: compiled, readingTime };
}
