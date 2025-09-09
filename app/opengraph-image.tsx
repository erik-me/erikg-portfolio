// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 86400; // must be a literal number

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Open Graph image";

export default async function Image() {
  const imgPath = path.join(
    process.cwd(),
    "public",
    "content",
    "media",
    "profilePhoto.jpg"
  );
  const buf = await fs.readFile(imgPath);
  const dataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;

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
    size
  );
}
