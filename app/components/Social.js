"use client";
import Section from "@/app/components/Section";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { SiTiktok } from "react-icons/si";

export default function Social() {
  return (
    <Section title="تابعنا على الشبكات الاجتماعية">
      <div className="flex flex-wrap gap-3">
        <Link
          href="https://www.instagram.com/hairstylesaudi/"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-neutral-300 hover:bg-neutral-100">
          <Instagram className="w-5 h-5" /> إنستغرام
        </Link>
        <Link
          href="https://www.tiktok.com/@hair.style.saudi"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-neutral-300 hover:bg-neutral-100">
          <SiTiktok className="w-5 h-5" /> تيك توك
        </Link>
      </div>
    </Section>
  );
}
