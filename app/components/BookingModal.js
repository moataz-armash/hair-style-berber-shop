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
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal>
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-extrabold">احجز موعدك</h3>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-1.5 bg-sand-100 hover:bg-sand-200 cursor-pointer">
            إغلاق
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1">
            <label className="text-sm">الاسم الكامل</label>
            <input
              name="name"
              required
              className="rounded-xl border border-ink-900/15 px-3 py-2"
              placeholder="اكتب اسمك"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm">رقم الجوال</label>
            <input
              name="phone"
              required
              inputMode="tel"
              className="rounded-xl border border-ink-900/15 px-3 py-2"
              placeholder="05XXXXXXXX"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm">اختر الفرع</label>
            <select
              name="branchId"
              required
              className="rounded-xl border border-ink-900/15 px-3 py-2">
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-1">
            <label className="text-sm">اختر الباقة</label>
            <select
              name="offerId"
              defaultValue={firstActiveOfferId}
              required
              className="rounded-xl border border-ink-900/15 px-3 py-2">
              {OFFERS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} — {o.amount} {o.currency}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm">التاريخ</label>
              <input
                type="date"
                name="date"
                defaultValue={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
                className="rounded-xl border border-ink-900/15 px-3 py-2"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">الوقت</label>
              <select
                name="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border border-ink-900/15 px-3 py-2">
                {slots.length === 0 ? (
                  <option value="" disabled>
                    لا توجد أوقات متاحة اليوم — اختر تاريخًا آخر
                  </option>
                ) : (
                  slots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* اختيار بوابة الدفع */}
          <div className="grid gap-2">
            <label className="text-sm">بوابة الدفع</label>
            <div className="flex flex-wrap gap-2">
              {/* <RadioChip
                value="auto"
                label="تلقائي (موصى به)"
                checked={gateway === "auto"}
                onChange={setGateway}
              /> */}
              <RadioChip
                value="cash"
                label="الدفع كاش بالفرع"
                checked={gateway === "cash"}
                onChange={setGateway}
              />
              <RadioChip
                value="tap"
                label="Tap (مدى/Apple Pay)"
                checked={gateway === "tap"}
                disabled={true}
                onChange={setGateway}
              />
              <RadioChip
                value="paytabs"
                label="PayTabs"
                checked={gateway === "paytabs"}
                disabled={true}
                onChange={setGateway}
              />
              <RadioChip
                value="moyasar"
                label="Moyasar"
                checked={gateway === "moyasar"}
                disabled={true}
                onChange={setGateway}
              />
            </div>
            <p className="text-xs text-ink-900/60">
              جميع الخيارات تدعم بطاقات مدى، فيزا/ماستر، ومعظمها يدعم Apple Pay
              وSTC Pay حسب إعدادات حسابك.
            </p>
          </div>

          {msg && <p className="text-sm text-coral-700">{msg}</p>}

          <button
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-ink-900 text-white px-5 py-3 hover:opacity-90 disabled:cursor-not-allowed">
            {loading ? "جارٍ المعالجة..." : "تأكيد الحجز والانتقال للدفع"}
          </button>
        </form>
      </div>
    </div>
  );
}

function RadioChip({ value, label, checked, onChange, disabled }) {
  const baseClasses =
    "select-none rounded-2xl border px-3 py-1.5 text-sm transition";
  const stateClasses = checked
    ? "bg-mint-600 text-white border-mint-600"
    : "bg-white border-ink-900/15 hover:bg-mint-50";
  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <label className={`${baseClasses} ${stateClasses} ${cursorClass}`}>
      <input
        type="radio"
        name="gateway"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}
