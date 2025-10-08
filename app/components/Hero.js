// app/components/Hero.js
"use client";

import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import CardSlider from "./CardSlider";
import { gallery } from "../lib/gallery";
import BookNow from "./BookNow";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-ink-900/40 bg-aurora">
      {/* هالة/غلالة الهيرو */}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />

      <div className="container py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
        {/* النص */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm glass ring-1 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-sun-500" />
              <span className="muted">
                تقييم <span className="text-white">5.0</span> من أكثر من{" "}
                <span className="text-white">186</span> مراجعة على خرائط Google
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            اكشخ بحلاقة تليق فيك
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="muted text-lg sm:text-xl max-w-3xl">
            مو بس حلاقة؛ تجربة فخمة وراحة من أول ما تدخل لين آخر لمسة — وبسعر
            يرضيك 😊.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3">
            <BookNow className="btn-primary cursor-pointer">
              <Calendar className="w-5 h-5" />
              احجز موعدك
            </BookNow>

            <a href="#offers" className="btn-outline">
              شوف عروضنا الخاصة
            </a>
          </motion.div>
        </div>

        {/* سلايدر الصور (داخليًا رِسبونسِف) */}
        <CardSlider items={gallery} />
      </div>
    </header>
  );
}
