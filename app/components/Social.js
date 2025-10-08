// app/components/Social.js
"use client";

import Section from "@/app/components/Section";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Social() {
  const items = [
    {
      href: "https://www.instagram.com/hairstylesaudi/",
      label: "إنستغرام",
      Icon: Instagram,
    },
    {
      href: "https://www.tiktok.com/@hair.style.saudi",
      label: "تيك توك",
      Icon: SiTiktok,
    },
  ];

  return (
    <Section title="تابعنا على منصات التواصل الاجتماعي">
      <div className="flex flex-wrap gap-3">
        {items.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="btn-outline btn-nav"
            aria-label={label}>
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
