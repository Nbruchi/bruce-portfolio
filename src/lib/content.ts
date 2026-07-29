import fs from "node:fs";
import path from "node:path";
import { createElement, type ReactElement } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { codeToHtml } from "shiki";
import { z } from "zod";

const WORK_DIR = path.join(process.cwd(), "content", "work");
const WRITING_DIR = path.join(process.cwd(), "content", "writing");

const workFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  timeframe: z.string(),
  stack: z.array(z.string()).min(1),
  liveUrl: z.url().optional(),
  repoUrl: z.url().optional(),
  figures: z.array(z.string()).min(1),
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
export type PostItem = { slug: string; frontmatter: PostFrontmatter };

// The `pre` override handed to every `compileMDX` call so Shiki highlighting
// applies wherever MDX content is rendered, without every caller repeating it.
// The visual treatment (surface-code background, radius, scroll) is layered
// on top by the content components in feature 05 — this only produces the
// highlighted markup.
type CodeElement = ReactElement<{ className?: string; children?: string }>;

async function CodeBlock({ children }: { children: CodeElement }): Promise<ReactElement> {
  const className = children.props.className ?? "";
  const lang = className.replace("language-", "") || "text";
  const code = children.props.children ?? "";
  const html = await codeToHtml(code, { lang, theme: "github-dark" });
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
    .map((slug) => ({
      slug,
      frontmatter: readFrontmatter(WRITING_DIR, slug, postFrontmatterSchema).frontmatter,
    }))
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
    options: { parseFrontmatter: false },
    components: { pre: CodeBlock, ...components },
  });

  return { frontmatter, content: compiled };
}

export async function getPostBySlug(
  slug: string,
  components?: MDXComponents,
): Promise<{ frontmatter: PostFrontmatter; content: ReactElement }> {
  const { frontmatter, content } = readFrontmatter(WRITING_DIR, slug, postFrontmatterSchema);
  const { content: compiled } = await compileMDX<PostFrontmatter>({
    source: content,
    options: { parseFrontmatter: false },
    components: { pre: CodeBlock, ...components },
  });

  return { frontmatter, content: compiled };
}
