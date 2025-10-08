// app/components/Section.js
"use client";

import { motion } from "framer-motion";

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="container py-16">
      <div className="mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight
            bg-gradient-to-r from-royal-500 via-mint-500 to-sky-500
            bg-clip-text text-transparent
          ">
          {title}
        </motion.h2>

        {/* شريط تزييني تحت العنوان */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="h-[3px] w-14 rounded-full bg-gradient-to-r from-royal-600 via-mint-600 to-sky-600"
          aria-hidden
        />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="muted text-base sm:text-lg mb-8 max-w-3xl">
          {subtitle}
        </motion.p>
      )}

      {children}
    </section>
  );
}
