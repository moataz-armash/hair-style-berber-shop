"use client";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchCard({ b, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="p-6 rounded-2xl bg-white/70 border border-neutral-200">
      <h3 className="text-lg font-bold mb-1">{b.name}</h3>
      <p className="text-neutral-600 mb-4">{b.address}</p>
      <div className="flex gap-2">
        <a
          href={b.mapUrl}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100">
          <MapPin className="w-4 h-4" /> فتح على الخريطة
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white">
          الاتجاهات
        </a>
      </div>
      <div className="mt-4 flex items-center gap-1 text-amber-500" aria-hidden>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} className="w-4 h-4 fill-current" />
        ))}
      </div>
    </motion.div>
  );
}
