// app/components/FinalCTA.js
"use client";

import { LocateFixed } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function FinalCTA() {
  return (
    <section className="py-12">
      <div className="container">
        {/* إطار متدرّج فخم + ظل ناعم */}
        <div
          className="
            relative rounded-3xl p-[1.5px]
            bg-gradient-to-r from-royal-600/40 via-mint-600/40 to-sky-600/40
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          ">
          <div
            className="
              rounded-3xl glass-2 ring-1
              flex flex-col md:flex-row items-center justify-between gap-4 p-6
              text-white
            ">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-extrabold mb-1">
                جاهز تطلع بأحسن نسخة منك؟
              </h3>
              <p className="muted">
                بلمسة تفتح أقرب فرع—وتجربتك الجاية تكون أرقى وأسهل.
              </p>
            </div>

            {/* زر بإطار متدرّج (Outlined) ليتماشى مع الثيم */}
            <button
              onClick={openNearestBranch}
              aria-label="افتح أقرب فرع عبر Google Maps"
              className="btn-outline-secondary btn-nav cursor-pointer">
              <LocateFixed className="w-5 h-5" />
              أقرب فرع الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
