// app/components/icons/SaudiRiyal.js
"use client";

/**
 * أيقونة الريال السعودي الجديد (SVG عبر CSS mask) — تُلوَّن بـ currentColor
 */
export default function SaudiRiyal({
  className = "w-6 h-6",
  title = "Saudi Riyal",
}) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-block align-middle ${className}`}
      style={{
        WebkitMaskImage: "url(/riyalsymbol.svg)",
        maskImage: "url(/riyalsymbol.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        backgroundColor: "currentColor",
        aspectRatio: "1 / 1",
      }}
    />
  );
}
