// app/components/FinalCTA.js
"use client";
import { LocateFixed } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function FinalCTA() {
  return (
    <section className="py-12">
      <div className="container">
        {/* إطار متدرّج زاهي */}
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-mint-600 via-sun-600 to-sky-600">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-ink-900 text-white ring-1 ring-white/10">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-extrabold mb-1">
                جاهز تطلع بأحسن نسخة منك؟
              </h3>
              <p className="opacity-90">
                أقرب فرع لك بلمسة، وتجربتك الجاية أرقى وأسهل.
              </p>
            </div>

            <button
              onClick={openNearestBranch}
              aria-label="افتح أقرب فرع عبر Google Maps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mint-600 text-white hover:bg-mint-700 transition shadow-lg">
              <LocateFixed className="w-5 h-5" />
              أقرب فرع لك الحين
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
