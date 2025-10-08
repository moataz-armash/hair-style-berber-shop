// app/lib/offers.js
// ملاحظة: استبدل قيم env بروابط الدفع الحقيقية (Payment Links) من كل مزود.
// يمكنك تشغيل عرض أو مزود واحد فقط الآن، والباقي اتركه فاضي.

export const HOURS = { open: "10:00", close: "22:00" };

export const OFFERS = [
  { id: "o50", name: "حزمة 50", amount: 50, currency: "SAR" },
  { id: "o80", name: "حزمة 80", amount: 80, currency: "SAR" },
  { id: "o100", name: "حزمة 100", amount: 100, currency: "SAR" },
  { id: "o150", name: "حزمة 150", amount: 150, currency: "SAR" },
  { id: "o500", name: "VIP 500", amount: 500, currency: "SAR" },
];

// روابط الدفع لكل عرض حسب المزود
export const PAYLINKS = {
  tap: {
    o50: process.env.NEXT_PUBLIC_TAP_o50, // مثال: https://pay.tap.company/xxxxxxxx
    o80: process.env.NEXT_PUBLIC_TAP_o80,
    o100: process.env.NEXT_PUBLIC_TAP_o100,
    o150: process.env.NEXT_PUBLIC_TAP_o150,
    o500: process.env.NEXT_PUBLIC_TAP_o500,
  },
  paytabs: {
    o50: process.env.NEXT_PUBLIC_PT_o50, // مثال: https://secure.paytabs.com/xxxx
    o80: process.env.NEXT_PUBLIC_PT_o80,
    o100: process.env.NEXT_PUBLIC_PT_o100,
    o150: process.env.NEXT_PUBLIC_PT_o150,
    o500: process.env.NEXT_PUBLIC_PT_o500,
  },
  moyasar: {
    o50: process.env.NEXT_PUBLIC_MOY_o50, // مثال: https://checkout.moyasar.com/xxxx
    o80: process.env.NEXT_PUBLIC_MOY_o80,
    o100: process.env.NEXT_PUBLIC_MOY_o100,
    o150: process.env.NEXT_PUBLIC_MOY_o150,
    o500: process.env.NEXT_PUBLIC_MOY_o500,
  },
};
