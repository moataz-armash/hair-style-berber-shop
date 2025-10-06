"use client";
import Link from "next/link";
// import { Instagram } from "lucide-react";
import { SiTiktok, SiInstagram } from "react-icons/si"; // TikTok icon fix

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-neutral-600">
        <p>© {new Date().getFullYear()} Hair Style</p>
        <nav className="flex items-center gap-4">
          <Link href="#offers" className="hover:underline">
            العروض
          </Link>
          <Link href="#branches" className="hover:underline">
            الفروع
          </Link>
          <Link href="#testimonials" className="hover:underline">
            التقييمات
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="https://www.instagram.com/hairstylesaudi/"
            target="_blank"
            aria-label="Instagram"
            className="hover:opacity-70">
            <SiInstagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.tiktok.com/@hair.style.saudi"
            target="_blank"
            aria-label="TikTok"
            className="hover:opacity-70">
            <SiTiktok className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
