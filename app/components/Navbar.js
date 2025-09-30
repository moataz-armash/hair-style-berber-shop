// components/Navbar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LocateFixed } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#offers", label: "العروض" },
    { href: "#branches", label: "الفروع" },
    { href: "#testimonials", label: "الآراء" },
  ];

  function closeAndGo() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container py-3 flex items-center justify-between">
        {/* اللوجو (LCP + SEO) */}
        <Link
          href="/"
          aria-label="Hair Style — الصفحة الرئيسية"
          className="flex items-center">
          <Image
            src="/logo.png" // من public/
            alt="شعار Hair Style — صالون رجالي"
            width={140}
            height={36}
            priority
            sizes="(max-width: 768px) 120px, 140px"
            className="h-9 w-auto" // h-18 غير موجودة في Tailwind الافتراضي
          />
          <span className="sr-only">Hair Style</span>
        </Link>

        {/* روابط الديسكتوب */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-ink-900/80 text-ink-900/70 transition">
              {l.label}
            </a>
          ))}
          <button
            onClick={openNearestBranch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mint-600 text-white hover:bg-mint-700 transition shadow-sm">
            <LocateFixed className="w-4 h-4" />
            أقرب فرع
          </button>
        </nav>

        {/* زر القائمة للجوال */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-sand-100"
          onClick={() => setOpen((s) => !s)}
          aria-label="فتح/إغلاق القائمة"
          aria-expanded={open}
          aria-controls="mobile-menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* قائمة الجوال */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-ink-900/10 bg-white/95 backdrop-blur">
          <div className="container py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeAndGo}
                className="py-2 text-ink-900/80 hover:text-ink-900 transition">
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                closeAndGo();
                openNearestBranch();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mint-600 text-white hover:bg-mint-700 transition shadow-sm">
              <LocateFixed className="w-4 h-4" />
              أقرب فرع
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
