// app/components/BranchCard.js
"use client";
import { MapPin, Star, Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchCard({ b, i = 0 }) {
  const disabled = Boolean(b.comingSoon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="relative p-6 rounded-2xl bg-white/80 border border-ink-900/10 shadow-sm">
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

      <p className="text-ink-800/70 mb-4">{b.address}</p>

      {/* أزرار الإجراءات */}
      <div className="flex gap-2">
        {disabled ? (
          <>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ink-900/15 bg-white text-ink-900 opacity-60 cursor-not-allowed"
              title="سيتوفر قريبًا">
              <MapPin className="w-4 h-4" />
              فتح على الخريطة
            </button>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-900 text-white opacity-60 cursor-not-allowed"
              title="سيتوفر قريبًا">
              الاتجاهات
            </button>
          </>
        ) : (
          <>
            <a
              href={b.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ink-900/15 hover:bg-mint-50 transition"
              title="فتح على الخريطة">
              <MapPin className="w-4 h-4" />
              فتح على الخريطة
            </a>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-900 text-white hover:opacity-90 transition"
              title="الاتجاهات عبر Google Maps">
              الاتجاهات
            </a>
          </>
        )}
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
