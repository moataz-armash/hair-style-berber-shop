// app/components/Hero.js
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, LocateFixed, ArrowRight } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // شيمر بسيط كصورة تمهيدية (placeholder)
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
            <span className="inline-flex items-center gap-2 text-sm bg-ink-900 text-white px-3 py-1.5 rounded-full shadow">
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
            className="text-ink-800/80 text-lg sm:text-xl max-w-3xl">
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ink-900 text-white hover:opacity-90 transition shadow-lg">
              <LocateFixed className="w-5 h-5" />
              احصل على أقرب فرع
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <a
              href="#offers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-ink-900/15 bg-white/70 hover:bg-white transition">
              الاطلاع على العروض الخاصة
            </a>
          </motion.div>
        </div>

        {/* صورة الهيرو مع لودر */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative">
          {/* إطار متدرّج عصري */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-ink-900/10 via-sand-200/60 to-transparent blur-xl -z-10" />

          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[520px] rounded-3xl overflow-hidden">
            {!loaded && (
              <div
                className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-sm"
                aria-label="جاري تحميل الصورة"
                role="status">
                <div className="h-10 w-10 rounded-full border-2 border-ink-900/20 border-t-ink-900 animate-spin" />
              </div>
            )}

            <Image
              src="/hero-barber.png" // ضع الصورة في public/
              alt="Hair Style — تجربة حلاقة رجالية راقية"
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className={`object-cover shadow-xl transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoadingComplete={() => setLoaded(true)}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
