"use client";
import { BRANCHES } from "@/app/lib/branches";
import toast from "react-hot-toast";

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
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    toast.error("متصفحك لا يدعم تحديد الموقع. الرجاء اختيار فرع من القائمة.");
    return;
  }

  // Show loading toast
  const loadingToast = toast.loading("جارٍ تحديد موقعك...");

  // Set timeout for geolocation request (10 seconds)
  const timeout = setTimeout(() => {
    toast.dismiss(loadingToast);
    toast.error(
      "استغرق تحديد الموقع وقتًا طويلاً. الرجاء المحاولة مرة أخرى أو اختيار فرع يدويًا."
    );
  }, 10000);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      // Clear timeout and loading toast
      clearTimeout(timeout);
      toast.dismiss(loadingToast);

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

      // Show success message with branch name
      toast.success(`أقرب فرع: ${nearest.name || "الفرع المحدد"}`);

      // Open Google Maps
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`,
        "_blank"
      );
    },
    (error) => {
      // Clear timeout and loading toast
      clearTimeout(timeout);
      toast.dismiss(loadingToast);

      // Handle different error types
      let errorMessage = "لم نستطع تحديد موقعك. ";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "الرجاء السماح بالوصول للموقع من إعدادات المتصفح.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "معلومات الموقع غير متوفرة حاليًا.";
          break;
        case error.TIMEOUT:
          errorMessage += "انتهت مهلة تحديد الموقع. الرجاء المحاولة مرة أخرى.";
          break;
        default:
          errorMessage += "حدث خطأ غير معروف.";
      }

      errorMessage += " يمكنك اختيار فرع من القائمة.";

      toast.error(errorMessage, {
        duration: 5000,
      });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // Cache position for 5 minutes
    }
  );
}
