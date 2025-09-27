"use client";
import { motion } from "framer-motion";
import { Star, LocateFixed, ArrowRight } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-transparent to-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="container py-24 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 text-sm bg-neutral-900 text-white px-3 py-1.5 rounded-full shadow">
            <Star className="w-4 h-4" />
            تقييم 4.9 من أكثر من 170 مراجعة على خرائط Google
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          اطلع بأناقة.. عيش الثقة
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-700 text-lg sm:text-xl max-w-3xl">
          مو بس قصة شعر.. تجربة كاملة تخليك تحس بالثقة وتستمتع بالراحة—بسعر
          يناسبك.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-3">
          <button
            onClick={openNearestBranch}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 text-white hover:opacity-90 transition shadow-lg">
            <LocateFixed className="w-5 h-5" />
            احصل على أقرب فرع
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
          <a
            href="#offers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-neutral-300 hover:bg-neutral-100 transition">
            الاطلاع على العروض الخاصة
          </a>
        </motion.div>
      </div>
    </header>
  );
}
