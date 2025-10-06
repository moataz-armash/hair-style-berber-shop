// components/Testimonials.tsx
"use client";

import Section from "@/app/components/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

/** Create a consistent pastel color from a string */
function nameToColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 65% 55%)`;
}

/** Generate a data-URI SVG avatar using the first character of the name */
function letterAvatarDataUri(name) {
  const trimmed = name.trim();
  const first = trimmed.charAt(0).toUpperCase();
  const bg = nameToColor(trimmed);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
      <rect width='80' height='80' rx='999' fill='${bg}'/>
      <text x='50%' y='52%' text-anchor='middle' dominant-baseline='middle'
        font-family='system-ui,-apple-system,Segoe UI,Roboto,Arial' font-weight='700'
        font-size='36' fill='#fff'>${first}</text>
    </svg>`;
  // encode safely for unicode
  const base64 =
    typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(svg)))
      : Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

export default function Testimonials() {
  const items = [
    {
      name: "Hasan Faqihi",
      text: "حلاقين رائيعين وعلى راسهم مجدي صراحه نظافة المكان الترتيب اخيرا صار فيه حلاق كويس غرب الرياض بهذا المستوى والاسعار رخيصة غير الخدمات وغرفة في اي بي للعرسان ارفع لهم القبعة",
      rating: 5,
    },
    {
      name: "ali hassan",
      text: "للامانة حلاق جميل فيه مميزات جديدة ونظافة واهتمام ويستاهلون اكثر من خمس نجوم من افضل الى افضل ان شاء الله",
      rating: 5,
    },
    {
      name: "حمد غنيمي",
      text: "افضل صالون في حي طويق  اشكر حلاق محمد واشكر المدير مجدي على الفرع الجميل♥️♥️",
      rating: 5,
    },
  ];

  return (
    <Section
      id="testimonials"
      title="آراء عملائنا"
      subtitle="⭐️⭐️⭐️⭐️⭐️ تقييم 5.0 من أكثر من 186 مراجعة على خرائط Google">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/70 border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={letterAvatarDataUri(t.name)}
                alt={`صورة ${t.name} (مُولّدة بالحرف الأول)`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-bold leading-tight">{t.name}</p>
                <p className="text-xs text-neutral-500">Review from Google</p>
              </div>
            </div>
            <div
              className="flex items-center gap-1 mb-2 text-amber-500"
              aria-hidden>
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-neutral-700">{t.text}</p>
          </motion.blockquote>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="https://www.google.com/maps/place/%D8%B5%D8%A7%D9%84%D9%88%D9%86+%D9%87%D9%8A%D8%B1+%D8%B3%D8%AA%D8%A7%D9%8A%D9%84+%D9%84%D9%84%D8%AD%D9%84%D8%A7%D9%82%D8%A9%E2%80%AD/@24.5801557,46.5439108,17z/data=!4m8!3m7!1s0x3e2f190072d4d74b:0x81dbff2dd278a52d!8m2!3d24.5801557!4d46.5439108!9m1!1b1!16s%2Fg%2F11xsnl2cyh?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 text-white">
          <Star className="w-5 h-5" />
          قراءة المراجعات على Google
        </Link>
      </div>
    </Section>
  );
}
