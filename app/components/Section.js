"use client";
import { motion } from "framer-motion";
export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="container py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-600 text-base sm:text-lg mb-8">
          {subtitle}
        </motion.p>
      )}
      {children}
    </section>
  );
}
