// app/lib/branches.js
export const BRANCHES = [
  {
    id: "riyadh",
    name: "فرع الرياض",
    address: "الرياض، السعودية",
    lat: 24.7136,
    lng: 46.6753,
    mapUrl: "https://maps.app.goo.gl/ProGEnTTJJTfiuKF6?g_st=ipc",
  },
  {
    id: "khobar",
    name: "فرع الخبر",
    address: "الخبر، السعودية",
    lat: 26.2797,
    lng: 50.2149,
    mapUrl: "https://maps.app.goo.gl/X2RR25DkJ1QmJtwy5?g_st=ipc",
  },
  {
    id: "dammam",
    name: "فرع الدمام",
    address: "الدمام، السعودية",
    lat: 26.4207,
    lng: 50.0888,
    mapUrl: "#", // لم يُفعّل بعد
    comingSoon: true, // ← مهم لتمييزه وتعطيل الأزرار
  },
];
