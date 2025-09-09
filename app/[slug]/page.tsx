// app/[slug]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import CaseStudy from "./CaseStudy";

// Use the Node.js runtime so we can read files at build time
export const runtime = "nodejs";
// Force static generation so `output: "export"` works
export const dynamic = "force-static";

// Tell Next.js which slugs to pre-render during `next export`
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "public", "content");
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  // Pre-render one page per Markdown file in /public/content/*.md
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => ({ slug: e.name.replace(/\.md$/, "") }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const contentDir = path.join(process.cwd(), "public", "content");

  const cvJson = await fs.readFile(path.join(contentDir, "profileData.json"), "utf8");
  const cv = JSON.parse(cvJson);

  const md = await fs.readFile(path.join(contentDir, `${params.slug}.md`), "utf8");

  return (
    <div>
      <CaseStudy cv={cv} markdownText={md} />
    </div>
  );
}
