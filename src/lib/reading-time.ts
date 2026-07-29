const WORDS_PER_MINUTE = 200;

// Strips the MDX syntax that would otherwise inflate the word count —
// code fences, inline code, headings/emphasis markers, and link syntax.
function toPlainText(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, "");
}

export function getReadingTime(mdx: string): number {
  const wordCount = toPlainText(mdx)
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
