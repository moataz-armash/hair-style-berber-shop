"use client";
import Section from "@/app/components/Section";
import { motion } from "framer-motion";
export default function Benefits() {
  const items = [
    {
      title: "أناقة تليق فيك",
      text: "قصّات عصرية على يد خبراء يضبطون الاستايل اللي يناسب وجهك.",
    },
    {
      title: "راحة تستاهلها",
      text: "كرسي فاخر، مساج مريح، وأجواء تعطيك إحساس سبا.",
    },
    {
      title: "مكان مناسب لك ولعائلتك",
      text: "مساحة للأطفال وخدمة تعكس الاهتمام بكل تفاصيل تجربتك.",
    },
  ];
  return (
    <Section
      title="مو بس حلاقة.. تجربة كاملة"
      subtitle="أنت تستاهل أكثر من مجرد كرسي وقصّة سريعة. في Hair Style نقدّم خدمة راقية، قصّات عصرية تناسب شخصيتك، جلسة مساج مريحة، ومساحة للأطفال.">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/70 border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-2">{c.title}</h3>
            <p className="text-neutral-600">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
