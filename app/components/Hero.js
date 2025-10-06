// app/components/Hero.js
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, LocateFixed, ArrowRight } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";
import CardSlider from "./CardSlider";
import { gallery } from "../lib/gallery";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // شيمر بسيط كـ placeholder
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns='http://www.w3.org/2000/svg' width='700' height='500'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop stop-color='#FCF6E8' offset='0'/>
          <stop stop-color='#F7EED8' offset='0.5'/>
          <stop stop-color='#EFE0BA' offset='1'/>
        </linearGradient>
      </defs>
      <rect rx='24' width='700' height='500' fill='url(#g)'>
        <animate attributeName='x' from='-100' to='100' dur='1.4s' repeatCount='indefinite'/>
      </rect>
    </svg>`
  )}`;

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-sand-50 to-sand-100">
      {/* هالة ناعمة */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(17,17,17,0.06),transparent_60%)]" />

      <div className="container py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
        {/* النص */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-sm bg-ink-900 text-white px-3 py-1.5 rounded-full shadow ring-1 ring-mint-500/30">
              <Star className="w-4 h-4" />
              تقييم 4.9 من أكثر من 170 مراجعة على خرائط Google
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            اطلع بأناقة تليق فيك{" "}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-ink-800/80 text-lg sm:text-xl max-w-3xl">
            مو بس حلاقة؛ تجربة فخمة وراحة من أول ما تدخل لين آخر لمسة — وبسعر
            يرضيك 😊.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3">
            <button
              onClick={openNearestBranch}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mint-600 text-white hover:bg-mint-700 transition shadow-lg">
              <LocateFixed className="w-5 h-5" />
              أقرب فرع لك الحين
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <a
              href="#offers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-mint-200 bg-white/80 hover:bg-mint-50 text-ink-900 transition">
              شوف عروضنا الخاصة
            </a>
          </motion.div>
        </div>

        <CardSlider items={gallery} />
      </div>
    </header>
  );
}
