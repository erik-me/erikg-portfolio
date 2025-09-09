// app/[slug]/page.tsx
// Temporary static-safe page to unblock deployment
// It declares no dynamic paths so Next.js export can complete.

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * Returning an empty array satisfies Next's requirement for dynamic
 * segments during `output: "export"`. No pages are generated for /[slug],
 * and any /something will 404 — which is fine for now.
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return [];
}

export default function Page() {
  return null; // nothing rendered because we aren't generating any slug pages yet
}
