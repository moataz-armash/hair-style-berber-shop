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
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/80 border border-ink-900/10 shadow-sm">
              <div
                className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${c.badge}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-ink-800/80">{c.text}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
