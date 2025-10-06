// app/sitemap.js
// Make this route static for output: "export"
export const dynamic = "force-static";

import { gallery } from "@/app/lib/gallery"; // adjust path if yours differs

// Use a full URL (no trailing slash)
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://hairstyleksasalon.com"
).replace(/\/$/, "");

export default function sitemap() {
  // Build absolute image URLs from your gallery data
  const images = [
    ...gallery.map((g) => `${BASE_URL}${g.src}`),
    `${BASE_URL}/logo.png`,
  ];

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(), // static at build time
      changeFrequency: "weekly",
      priority: 1,
      images,
    },
  ];
}
