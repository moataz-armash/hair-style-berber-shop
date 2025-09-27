"use client";
import { BRANCHES } from "@/app/lib/branches";

function distanceKm(a, b) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export function openNearestBranch() {
  if (!navigator.geolocation) {
    alert("لم نستطع تحديد موقعك. اختر فرعًا من القائمة.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      let nearest = BRANCHES[0];
      let best = distanceKm(me, nearest);
      for (const b of BRANCHES.slice(1)) {
        const d = distanceKm(me, b);
        if (d < best) {
          best = d;
          nearest = b;
        }
      }
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`,
        "_blank"
      );
    },
    () => alert("لم نستطع الوصول لموقعك. اختر فرعًا من القائمة.")
  );
}
