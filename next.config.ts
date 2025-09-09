import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export the site as static HTML in the /out folder
  output: "export",

  // Required because GitHub Pages cannot run the image optimizer
  images: {
    unoptimized: true,
  },

  // Ensures clean routing (important for GitHub Pages)
  trailingSlash: true,
};

export default nextConfig;
