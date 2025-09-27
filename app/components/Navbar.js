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

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200">
      <div className="container py-3 flex items-center justify-between">
        {/* ← اللوجو (أفضل لـLCP + SEO) */}
        <Link
          href="/"
          aria-label="Hair Style — الصفحة الرئيسية"
          className="flex items-center">
          <Image
            src="/logo.png" // من public/
            alt="شعار Hair Style — صالون رجالي"
            width={140}
            height={20}
            priority // يسرّع التحميل (LCP)
            sizes="(max-width: 768px) 120px, 140px"
            className="h-18 w-auto"
          />
          <span className="sr-only">Hair Style</span>
        </Link>

        {/* بقية النافبار المختصرة */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-70">
              {l.label}
            </a>
          ))}
          <button
            onClick={openNearestBranch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white">
            <LocateFixed className="w-4 h-4" /> أقرب فرع
          </button>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* قائمة الجوال… */}
      {open && (
        <div className="md:hidden border-t border-neutral-200">
          <div className="container py-3 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1">
                {l.label}
              </a>
            ))}
            <button
              onClick={openNearestBranch}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white">
              <LocateFixed className="w-4 h-4" /> أقرب فرع
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
