// app/components/BranchCard.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Hourglass } from "lucide-react";

export default function BranchCard({ b, i = 0 }) {
  const disabled = Boolean(b.comingSoon);

  // fallback إذا ما توفّرت mapUrl
  const mapUrl =
    b?.mapUrl ||
    (b?.lat && b?.lng
      ? `https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`
      : "#");

  const dirUrl =
    b?.lat && b?.lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`
      : mapUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="relative p-6 rounded-2xl glass ring-1 text-white">
      <h3 className="text-lg font-bold mb-1">
        {b.name}{" "}
        {disabled && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sun-600 text-white text-xs align-middle"
            aria-label="الفرع سيتم افتتاحه قريبًا">
            <Hourglass className="w-3.5 h-3.5" />
            قريبًا
          </span>
        )}
      </h3>

      <p className="muted mb-4">{b.address}</p>

      {/* أزرار الإجراءات */}
      <div className="flex gap-2">
        <Link
          href={disabled ? "#" : mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
          className={`btn-outline btn-nav ${
            disabled ? "opacity-60 pointer-events-none" : ""
          }`}
          title="فتح على الخريطة">
          <MapPin className="w-4 h-4" />
          فتح على الخريطة
        </Link>

        <Link
          href={disabled ? "#" : dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
          className={`btn-outline-secondary btn-nav ${
            disabled ? "opacity-60 pointer-events-none" : ""
          }`}
          title="الاتجاهات عبر Google Maps">
          الاتجاهات
        </Link>
      </div>

      {/* نجوم التقييم (ديكور) */}
      <div
        className="mt-4 flex items-center gap-1 text-amber-500"
        aria-hidden="true">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="w-4 h-4 fill-current" />
        ))}
      </div>
    </motion.div>
  );
}
