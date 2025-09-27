"use client";
import Section from "@/app/components/Section";
import { motion } from "framer-motion";
export default function Offers() {
  return (
    <Section
      id="offers"
      title="القائمة والعروض"
      subtitle="اطّلع على القائمة الكاملة والعروض الحالية مباشرة من روابطنا.">
      <div className="grid md:grid-cols-3 gap-6">
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          href="https://linktr.ee/hairstaylee"
          target="_blank"
          className="block p-6 rounded-2xl bg-neutral-900 text-white hover:opacity-90 transition shadow-md">
          <h3 className="text-xl font-bold mb-2">القائمة عبر Linktree</h3>
          <p className="opacity-90">
            افتح القائمة (PDF) وكل الروابط المهمة في مكان واحد.
          </p>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          href="https://drive.google.com/file/d/1hcegdg3N2bk9g1go7bKKv83T-9RQdJub/view"
          target="_blank"
          className="block p-6 rounded-2xl bg-white/70 border border-neutral-200 hover:bg-neutral-50 transition">
          <h3 className="text-xl font-bold mb-2">عرض الشيوخ</h3>
          <p className="text-neutral-600">
            يحتوي أكثر من خدمة مميّزة. انقر للتفاصيل.
          </p>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="https://drive.google.com/file/d/1XBbkLqw0FcC8hDaOkFCQYkPLt3sqZ4qm/view"
          target="_blank"
          className="block p-6 rounded-2xl bg-white/70 border border-neutral-200 hover:bg-neutral-50 transition">
          <h3 className="text-xl font-bold mb-2">عروض هير ستايل الخاصة</h3>
          <p className="text-neutral-600">
            صفقات قيّمة وتجارب فاخرة بسعر معقول. انقر للتفاصيل
          </p>
        </motion.a>
      </div>
      <div className="mt-6">
        <a
          href="https://drive.google.com/file/d/1rO4N89ND3E4yZdEBccFEF-je970H8UMt/view"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-neutral-300 hover:bg-neutral-100">
          فتح قائمة الأسعار (PDF)
        </a>
      </div>
    </Section>
  );
}
