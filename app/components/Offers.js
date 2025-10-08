"use client";

import { useState } from "react";
import Section from "@/app/components/Section";
import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import SaudiRiyal from "./icons/SaudiRiyal";
import Link from "next/link";

// بيانات العروض
const OFFERS = [
  {
    id: "sheikhs",
    title: "عرض الشيوخ",
    price: "500",
    color: "from-royal-600 to-coral-600",
    items: [
      "شمع",
      "حلاقة شعر",
      "حلاقة ذقن",
      "بروتين شعر",
      "غسيل شعر",
      "مساج قدم",
      "تنظيف بشرة عميق هيدروفشيال",
      "باديكير كامل (يد وقدم)",
    ],
    link: "https://drive.google.com/file/d/1XBbkLqw0FcC8hDaOkFCQYkPLt3sqZ4qm/view",
  },
  {
    id: "offer150",
    title: "عرض الـ 150",
    price: "150",
    color: "from-mint-600 to-sky-600",
    items: [
      "حلاقة شعر",
      "حلاقة ذقن",
      "سنفرة وبخار وجه",
      "فوطه حاره",
      "قناع وجه",
      "حمام زيت بالبخار",
      "استشوار",
      "شمع",
      "صبغة خفيفة (ذقن/شعر)",
    ],
    link: "https://drive.google.com/file/d/1hcegdg3N2bk9g1go7bKKv83T-9RQdJub/view",
  },
  {
    id: "offer100",
    title: "عرض الـ 100",
    price: "100",
    color: "from-sun-600 to-mint-600",
    items: [
      "حلاقة شعر",
      "حلاقة ذقن",
      "سنفرة وبخار وجه",
      "فوطه حاره",
      "قناع وجه",
      "حمام زيت بالبخار",
      "لَزقة خشم",
      "استشوار",
      "شمع",
    ],
    link: "https://drive.google.com/file/d/1hcegdg3N2bk9g1go7bKKv83T-9RQdJub/view",
  },
  {
    id: "offer80",
    title: "عرض الـ 80",
    price: "80",
    color: "from-sky-600 to-royal-600",
    items: [
      "حلاقة شعر",
      "حلاقة ذقن",
      "سنفرة وبخار وجه",
      "فوطه حاره",
      "قناع وجه",
      "حمام زيت بالبخار",
      "لَزقة خشم",
      "استشوار",
      "شمع",
    ],
    link: "https://drive.google.com/file/d/1hcegdg3N2bk9g1go7bKKv83T-9RQdJub/view",
  },
  {
    id: "offer50",
    title: "عرض الـ 50",
    price: "50",
    color: "from-coral-600 to-sun-600",
    items: ["حلاقة شعر", "حلاقة ذقن", "سنفرة", "فوطه حاره/قناع", "لَزقة خشم"],
    link: "https://drive.google.com/file/d/1hcegdg3N2bk9g1go7bKKv83T-9RQdJub/view",
  },
];

function OfferCard({ offer, i }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="perspective-1000">
      {/* إطار أنيق حول البطاقة */}
      <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-royal-600/40 via-ink-700 to-mint-600/30 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div
          className="relative h-[280px] sm:h-[300px] rounded-3xl cursor-pointer preserve-3d transition-transform duration-500"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          onClick={() => setFlipped((s) => !s)}
          role="button"
          aria-pressed={flipped}
          aria-label={`فتح تفاصيل ${offer.title}`}>
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden">
            <div
              className={`h-full w-full p-6 flex flex-col justify-between text-white
                          bg-gradient-to-br ${offer.color || "from-royal-600 via-mint-600 to-sky-600"}`}>
              <div className="space-y-2">
                <p className="text-xs/5 sm:text-sm/5 text-white/80">عرض خاص</p>
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {offer.title}
                </h3>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black leading-none tracking-tight">
                    {offer.price}
                  </span>
                  <SaudiRiyal className="w-6 h-6 text-white/90" />
                </div>
                <span className="inline-flex items-center gap-1 text-sand-200/90 bg-white/15 px-3 py-1 rounded-full">
                  اضغط للتفاصيل <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden"
            style={{ transform: "rotateY(180deg)" }}>
            <div className="h-full w-full p-6 flex flex-col glass-2 ring-1 text-white">
              <h4 className="text-lg font-bold mb-3">{offer.title}</h4>

              <ul className="space-y-2 overflow-auto pr-1 muted">
                {offer.items?.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <BadgeCheck className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-extrabold text-white">
                  {offer.price}{" "}
                  <SaudiRiyal className="w-5 h-5 inline text-white" />
                </span>

                <div className="flex items-center gap-2">
                  {offer.link && (
                    <a
                      href={offer.link}
                      target="_blank"
                      className="btn-outline !px-3 !py-1.5"
                      onClick={(e) => e.stopPropagation()}>
                      فتح الـ PDF <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Offers() {
  return (
    <Section
      id="offers"
      title="باقاتنا وعروضنا"
      subtitle="اضغط على أي بطاقة لعرض التفاصيل كاملة.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer, i) => (
          <OfferCard key={offer.id} offer={offer} i={i} />
        ))}
      </div>

      {/* روابط عامة إضافية */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="https://linktr.ee/hairstaylee"
          target="_blank"
          className="btn-outline">
          كل الروابط عبر Linktree
        </Link>
        <Link
          href="https://drive.google.com/file/d/1rO4N89ND3E4yZdEBccFEF-je970H8UMt/view"
          target="_blank"
          className="btn-outline">
          قائمة الأسعار (PDF)
        </Link>
      </div>
    </Section>
  );
}
