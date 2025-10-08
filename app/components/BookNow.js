// app/components/BookNow.js
"use client";
import { useEffect, useMemo, useState } from "react";
import { HOURS, OFFERS, PAYLINKS } from "@/app/lib/offers";
import { BRANCHES } from "@/app/lib/branches";
import { buildSlots, getLocalDateInputValue } from "../helpers/bookNow";
import toast from "react-hot-toast";
import { BookingModal } from "./BookingModal";

export default function BookNow({ defaultOfferId, className = "", children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mint-600 text-white hover:bg-mint-700 transition"
        }>
        {children || "احجز موعدك"}
      </button>
      {open && (
        <BookingModal
          onClose={() => setOpen(false)}
          defaultOfferId={defaultOfferId}
        />
      )}
    </>
  );
}
