// components/Benefits.tsx
"use client";
import Section from "@/app/components/Section";
import { motion } from "framer-motion";
import { Scissors, Armchair, Users } from "lucide-react";

export default function Benefits() {
  const items = [
    {
      icon: Scissors,
      title: "أناقة تليق فيك",
      text: "قصّات عصرية على يد خبراء يضبطون الاستايل اللي يناسب وجهك.",
      badge: "bg-mint-50 text-mint-700",
    },
    {
      icon: Armchair,
      title: "راحة تستاهلها",
      text: "كرسي فاخر، مساج مريح، وأجواء تعطيك إحساس سبا.",
      badge: "bg-sun-50 text-sun-700",
    },
    {
      icon: Users,
      title: "مكان مناسب لك ولعائلتك",
      text: "مساحة للأطفال وخدمة تعكس الاهتمام بكل تفاصيل تجربتك.",
      badge: "bg-sky-50 text-sky-700",
    },
  ];

  return (
    <Section
      title="مو بس حلاقة.. تجربة كاملة"
      subtitle="في هير ستايل نهتم فيك من الاستقبال لين آخر لمسة — قصّات عصرية، عناية راقية، ومساحة مريحة للعائلة.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="
            relative rounded-3xl p-[1.5px]
            bg-gradient-to-br from-royal-600/40 via-ink-700 to-mint-600/30
          ">
              {/* inner card */}
              <div
                className="
              card h-full group transition
              hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(124,58,237,0.25)]
            ">
                <div
                  className={`
                mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl
                ring-1 ring-white/10 text-white
                bg-gradient-to-br from-royal-600/40 via-mint-600/25 to-sky-600/25
                ${c.badge || ""}
              `}
                  aria-hidden>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
                  {c.title}
                </h3>

                <p className="muted">{c.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
