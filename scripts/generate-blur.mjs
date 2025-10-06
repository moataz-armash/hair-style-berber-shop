// scripts/generate-blurs.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcDir = path.resolve("public/imgs");
const outDir = path.resolve("public/imgs/blur");
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .slice(0, 10); // خذ أول 10 صور أو عدّل حسب حاجتك

for (const file of files) {
  const inPath = path.join(srcDir, file);
  const outPath = path.join(outDir, file.replace(/\.(png|jpg|jpeg)$/i, ".jpg"));

  // نولّد نسخة صغيرة (24px) مع بلور خفيف وجودة منخفضة — مثالية كـ placeholder
  await sharp(inPath)
    .resize(24) // عرض 24 بكسل (يكفي للـblur)
    .blur(8) // درجة البلور
    .jpeg({ quality: 35, mozjpeg: true })
    .toFile(outPath);

  console.log("✓ blur ->", path.relative(process.cwd(), outPath));
}
console.log("Done. Put these paths as /imgs/blur/<name>.jpg");
