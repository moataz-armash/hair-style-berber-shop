// app/components/Footer.js
"use client";

import Link from "next/link";
import { SiTiktok, SiInstagram } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12">
      {/* خط علوي متدرّج فاخر */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-royal-600 via-mint-600 to-sky-600 opacity-50"
        aria-hidden
      />

      <div className="container py-8 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* روابط */}
        <nav className="order-2 md:order-1 flex items-center gap-6">
          <Link href="#offers" className="nav-link">
            العروض
          </Link>
          <Link href="#branches" className="nav-link">
            الفروع
          </Link>
          <Link href="#testimonials" className="nav-link">
            التقييمات
          </Link>
        </nav>

        {/* حقوق */}
        <p className="order-3 md:order-2 text-center md:text-right">
          © {year} Hair Style — جميع الحقوق محفوظة
        </p>

        {/* سوشيال بأزرار Outlined عصرية */}
        <div className="order-1 md:order-3 flex items-center gap-2">
          <Link
            href="https://www.instagram.com/hairstylesaudi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="btn-outline !p-2 rounded-xl">
            <SiInstagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.tiktok.com/@hair.style.saudi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="btn-outline !p-2 rounded-xl">
            <SiTiktok className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
