"use client";
import Section from "@/app/components/Section";
import { BRANCHES } from "@/app/lib/branches";
import BranchCard from "@/app/components/BranchCard";
import { LocateFixed } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";

export default function Branches() {
  return (
    <Section
      id="branches"
      title="فروعنا"
      subtitle="3 فروع قريبة منك — افتح أقرب فرع أو اختر من القائمة.">
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={openNearestBranch}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 text-white hover:opacity-90 transition shadow">
          <LocateFixed className="w-5 h-5" /> افتح أقرب فرع عبر Google Maps
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {BRANCHES.map((b, i) => (
          <BranchCard key={b.id} b={b} i={i} />
        ))}
      </div>
    </Section>
  );
}
