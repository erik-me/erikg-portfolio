// app/[slug]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import CaseStudy from "./CaseStudy";

export const runtime = "nodejs";
export const dynamic = "force-static";

type Params = { slug: string };

// Tell Next.js which slugs to pre-render for static export
export async function generateStaticParams(): Promise<Params[]> {
  const contentDir = path.join(process.cwd(), "public", "content");
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => ({ slug: e.name.replace(/\.md$/, "") }));
}

// NOTE: params is a plain object, NOT a Promise
export default async function Page({ params }: { params: Params }) {
  const contentDir = path.join(process.cwd(), "public", "content");

  const cvJson = await fs.readFile(path.join(contentDir, "profileData.json"), "utf8");
  const cv = JSON.parse(cvJson);

  const md = await fs.readFile(path.join(contentDir, `${params.slug}.md`), "utf8");

  return <CaseStudy cv={cv} markdownText={md} />;
}
