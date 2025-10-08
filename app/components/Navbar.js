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
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-ink-900/60 supports-[backdrop-filter]:bg-ink-900/50">
      <div className="container py-3 flex items-center justify-between">
        {/* اللوجو */}
        <Link
          href="/"
          aria-label="Hair Style — الصفحة الرئيسية"
          className="flex items-center">
          <Image
            src="/hairstyle_logo_bgwhitewebp.webp"
            alt="شعار Hair Style — صالون رجالي"
            width={160}
            height={50}
            priority
            sizes="(max-width: 768px) 120px, 140px"
            className="h-16 w-auto rounded-2xl"
          />
          <span className="sr-only">Hair Style</span>
        </Link>

        {/* روابط الديسكتوب */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <button onClick={openNearestBranch} className="btn-outline btn-nav">
            <LocateFixed className="w-4 h-4" />
            أقرب فرع
          </button>
        </nav>

        {/* زر القائمة للجوال */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white"
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
          className="md:hidden border-t border-white/10 bg-ink-900/80 backdrop-blur">
          <div className="container py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeAndGo}
                className="py-2 text-white/80 hover:text-white transition">
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                closeAndGo();
                openNearestBranch();
              }}
              className="btn-outline w-full justify-center">
              <LocateFixed className="w-4 h-4" />
              أقرب فرع
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
