import { useEffect, useMemo, useState } from "react";
import { HOURS, OFFERS, PAYLINKS } from "../lib/offers";
import { buildSlots, getLocalDateInputValue } from "../helpers/bookNow";
import { BRANCHES } from "../lib/branches";

export function BookingModal({ onClose, defaultOfferId }) {
  const [loading, setLoading] = useState(false);
  const [gateway, setGateway] = useState("cash"); // auto | tap | paytabs | moyasar
  const [msg, setMsg] = useState("");

  const firstActiveOfferId = useMemo(() => {
    if (defaultOfferId) return defaultOfferId;
    // أول عرض فعّال (له أي رابط دفع في أي مزود)
    for (const o of OFFERS) {
      if (
        PAYLINKS.tap[o.id] ||
        PAYLINKS.paytabs[o.id] ||
        PAYLINKS.moyasar[o.id]
      )
        return o.id;
    }
    return OFFERS[0]?.id;
  }, [defaultOfferId]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const offerId = data.offerId;

    // Pick a payment link if not cash
    let payUrl = null;
    if (gateway !== "cash") {
      const pickAuto = () => {
        const ua = navigator.userAgent.toLowerCase();
        if (PAYLINKS.tap[offerId] && /iphone|ipad|safari/.test(ua))
          return PAYLINKS.tap[offerId];
        return (
          PAYLINKS.paytabs[offerId] ||
          PAYLINKS.moyasar[offerId] ||
          PAYLINKS.tap[offerId] ||
          null
        );
      };
      if (gateway === "tap") payUrl = PAYLINKS.tap[offerId] || null;
      else if (gateway === "paytabs")
        payUrl = PAYLINKS.paytabs[offerId] || null;
      else if (gateway === "moyasar")
        payUrl = PAYLINKS.moyasar[offerId] || null;
      else payUrl = pickAuto();
    }

    // Always notify by email
    const payload = {
      ...data,
      time,
      date,
      paymentMethod: gateway,
      offerId,
    };

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onClose();
      if (!res.ok) throw new Error("email failed");
    } catch (err) {
      console.warn("Email notification failed:", err);
      // نتابع — لكن نعرض تنبيه بسيط
      toast.error(
        "تم تسجيل الطلب، لكن تعذّر إرسال الإشعار بالبريد. سنتابع يدويًا."
      );
    }

    setLoading(false);

    if (gateway === "cash") {
      // Cash: stay on site, show confirmation
      toast.success("تم تسجيل حجزك بنجاح. تقدر تدفع كاش عند الوصول✨");
      // اختياري: اجعل الزر يتغير إلى “تم”
      return;
    }

    // Online payment: redirect
    if (payUrl) {
      window.location.href = payUrl;
    } else {
      setMsg(
        "تعذّر العثور على رابط الدفع لهذا العرض. اختر مزوّد مختلف أو تواصل معنا."
      );
    }
  }

  const today = useMemo(() => getLocalDateInputValue(), []);
  const [date, setDate] = useState(today);

  const slots = useMemo(
    () => buildSlots(date, HOURS.open, HOURS.close),
    [date]
  );
  const [time, setTime] = useState(slots[0] || "");

  useEffect(() => {
    setTime(slots[0] || "");
  }, [slots]);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true">
      <div
        className="w-full max-w-lg rounded-3xl glass-2 ring-1 p-5 sm:p-6 shadow-xl text-white"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold">احجز موعدك</h3>
          <button
            onClick={onClose}
            className="btn-outline btn-nav cursor-pointer">
            إغلاق
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          {/* الاسم */}
          <div className="grid gap-1">
            <label className="text-sm muted-2">الاسم الكامل</label>
            <input
              name="name"
              required
              className="rounded-xl bg-[var(--surface-1)] ring-1 px-3 py-2 text-white placeholder:muted focus:outline-none focus:outline-2 focus:outline-royal-600"
              placeholder="اكتب اسمك"
            />
          </div>

          {/* الجوال */}
          <div className="grid gap-1">
            <label className="text-sm muted-2">رقم الجوال</label>
            <input
              name="phone"
              required
              inputMode="tel"
              className="rounded-xl bg-[var(--surface-1)] ring-1 px-3 py-2 text-white placeholder:muted focus:outline-none focus:outline-2 focus:outline-royal-600"
              placeholder="05XXXXXXXX"
            />
          </div>

          {/* الفرع */}
          <div className="grid gap-1">
            <label className="text-sm muted-2">اختيار الفرع</label>
            <div className="relative">
              <select name="branchId" required className="dark-select">
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <svg
                className="select-chevron w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* الباقة */}
          <div className="grid gap-1">
            <label className="text-sm muted-2">اختيار الباقة</label>
            <div className="relative">
              <select
                name="offerId"
                defaultValue={firstActiveOfferId}
                required
                className="dark-select">
                {OFFERS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — {o.amount} {o.currency}
                  </option>
                ))}
              </select>
              <svg
                className="select-chevron w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* التاريخ والوقت */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm muted-2">التاريخ</label>
              <input
                type="date"
                name="date"
                defaultValue={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
                className="rounded-xl bg-[var(--surface-1)] ring-1 px-3 py-2 text-white focus:outline-none focus:outline-2 focus:outline-royal-600"
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm muted-2">الوقت</label>
              <div className="relative">
                <select
                  name="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="dark-select">
                  {slots.length === 0 ? (
                    <option value="" disabled>
                      لا تتوفر مواعيد لهذا اليوم — الرجاء اختيار تاريخ آخر
                    </option>
                  ) : (
                    slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))
                  )}
                </select>
                <svg
                  className="select-chevron w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* طريقة الدفع */}
          <div className="grid gap-2">
            <label className="text-sm muted-2">طريقة الدفع</label>
            <div className="flex flex-wrap gap-2">
              <RadioChip
                value="cash"
                label="نقدًا (كاش) في الفرع"
                checked={gateway === "cash"}
                onChange={setGateway}
              />
              <RadioChip
                value="tap"
                label="Tap (مدى / Apple Pay)"
                checked={gateway === "tap"}
                disabled
                onChange={setGateway}
              />
              <RadioChip
                value="paytabs"
                label="PayTabs"
                checked={gateway === "paytabs"}
                disabled
                onChange={setGateway}
              />
              <RadioChip
                value="moyasar"
                label="Moyasar"
                checked={gateway === "moyasar"}
                disabled
                onChange={setGateway}
              />
            </div>
            <p className="text-xs muted-2">
              تدعم الخيارات بطاقات مدى، فيزا/ماستركارد، ومعظمها يدعم Apple Pay
              وSTC Pay بحسب إعدادات حسابك.
            </p>
          </div>

          {msg && <p className="text-sm text-coral-500">{msg}</p>}

          <button
            disabled={loading}
            className="mt-2 btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "جاري معالجة الطلب..." : "تأكيد الحجز والمتابعة"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RadioChip({
  value,
  label,
  checked,
  onChange,
  disabled = false,
}) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm select-none transition focus-within:outline focus-within:outline-2 focus-within:outline-royal-600";
  const state = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const surfaceChecked =
    "text-white bg-gradient-to-r from-royal-600 to-mint-600 shadow-[0_6px_18px_rgba(124,58,237,.25),0_4px_14px_rgba(16,185,129,.18)]";
  const surfaceIdle =
    "text-white/85 bg-[var(--surface-1)] ring-1 ring-[var(--ring-1)] hover:bg-[var(--surface-2)]";

  return (
    <label
      className={`${base} ${checked ? surfaceChecked : surfaceIdle} ${state}`}>
      <input
        type="radio"
        name="gateway"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {/* نقطة حالة بسيطة */}
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          checked ? "bg-white" : "bg-white/30"
        }`}
        aria-hidden
      />
      <span>{label}</span>
    </label>
  );
}
