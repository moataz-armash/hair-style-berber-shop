"use client";
import { LocateFixed } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function FinalCTA() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-neutral-900 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-1">جاهز للتغيير؟</h3>
            <p className="opacity-90">
              احصل على أقرب فرع الآن وخلّ تجربتك القادمة أرقى وأسهل.
            </p>
          </div>
          <button
            onClick={openNearestBranch}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-neutral-900">
            <LocateFixed className="w-5 h-5" /> احصل على أقرب فرع
          </button>
        </div>
      </div>
    </div>
  );
}
