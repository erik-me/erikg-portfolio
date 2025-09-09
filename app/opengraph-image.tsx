// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import profileData from "../public/content/profileData.json";

// Make it prerender at build time for output: "export"
export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24; // 24h

export const alt = profileData.general.byline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Read the portrait from /public so it’s available at build time
  const imgPath = path.join(
    process.cwd(),
    "public",
    "content",
    "media",
    "profilePhoto.jpg"
  );
  const imageBuffer = await fs.readFile(imgPath);

  // Use a data URL so it works during static generation
  const dataUrl = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={dataUrl} height={400} style={{ borderRadius: "50%" }} />
      </div>
    ),
    { ...size }
  );
}
