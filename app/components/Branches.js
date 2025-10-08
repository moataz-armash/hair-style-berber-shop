// app/components/Branches.js
"use client";
import { useMemo, useState } from "react";
import Section from "@/app/components/Section";
import { BRANCHES } from "@/app/lib/branches";
import BranchCard from "@/app/components/BranchCard";
import { LocateFixed, Compass, MapPin, Loader2 } from "lucide-react";
import { openNearestBranch } from "@/app/lib/openNearestBranch";
import toast from "react-hot-toast";

// Haversine
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

export default function Branches() {
  const [myPos, setMyPos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // تجاهل الفروع القادمة من الحساب
  const activeBranches = useMemo(
    () => BRANCHES.filter((b) => !b.comingSoon),
    []
  );

  const distances = useMemo(() => {
    if (!myPos) return null;
    const map = {};
    activeBranches.forEach((b) => (map[b.id] = distanceKm(myPos, b)));
    return map;
  }, [myPos, activeBranches]);

  const nearestId = useMemo(() => {
    if (!distances) return null;
    return Object.entries(distances).sort((a, b) => a[1] - b[1])[0][0];
  }, [distances]);

  const sorted = useMemo(() => {
    if (!distances) return BRANCHES; // قبل تحديد الموقع، أعرض كل الفروع
    // فرز النشطة أولاً حسب المسافة ثم تأتي "قريبًا" في النهاية
    const activeSorted = [...activeBranches].sort(
      (a, b) => distances[a.id] - distances[b.id]
    );
    const coming = BRANCHES.filter((b) => b.comingSoon);
    return [...activeSorted, ...coming];
  }, [distances, activeBranches]);

  function useMyLocation() {
    if (!navigator.geolocation) {
      toast.error("متصفحك لا يدعم تحديد الموقع. الرجاء تحديث المتصفح.");
      return;
    }

    setIsLoading(true);

    // Set timeout for geolocation request
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error(
        "استغرق تحديد الموقع وقتًا طويلاً. الرجاء المحاولة مرة أخرى."
      );
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeout);
        setIsLoading(false);
        setMyPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success("تم تحديد موقعك بنجاح! الفروع مرتبة حسب القرب منك.");
      },
      (error) => {
        clearTimeout(timeout);
        setIsLoading(false);

        let errorMessage = "لم نستطع تحديد موقعك. ";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "الرجاء السماح بالوصول للموقع من إعدادات المتصفح.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "معلومات الموقع غير متوفرة حاليًا.";
            break;
          case error.TIMEOUT:
            errorMessage +=
              "انتهت مهلة تحديد الموقع. الرجاء المحاولة مرة أخرى.";
            break;
          default:
            errorMessage += "حدث خطأ غير معروف.";
        }

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

  return (
    <Section
      id="branches"
      title="فروعنا"
      subtitle="فروع الرياض والخبر متاحة الآن — استخدم موقعك لعرض الأقرب أولًا. فرع الدمام قريبًا.">
      {/* أزرار */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={openNearestBranch}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mint-600 text-white hover:bg-mint-700 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}>
          <LocateFixed className="w-5 h-5" />
          افتح أقرب فرع عبر Google Maps
        </button>

        <button
          onClick={useMyLocation}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-ink-900/15 bg-white hover:bg-mint-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Compass className="w-5 h-5" />
          )}
          {isLoading ? "جارٍ تحديد الموقع..." : "استخدم موقعي للفرز"}
        </button>
      </div>

      {/* الشبكة */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((b) => {
          const dist = distances && !b.comingSoon ? distances[b.id] : null;
          const isNearest = nearestId === b.id;

          return (
            <div
              key={b.id}
              className="relative rounded-3xl p-[2px] bg-gradient-to-br from-mint-200 via-sun-200 to-sky-200 shadow-sm">
              <div className="rounded-3xl bg-white/90 backdrop-blur-sm">
                {/* شارة المسافة */}
                {dist !== null && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/90 text-white text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {dist.toFixed(1)} كم
                    </span>
                  </div>
                )}

                {/* شارة الأقرب */}
                {isNearest && !b.comingSoon && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-mint-600 text-white text-xs">
                      الأقرب لك الآن
                    </span>
                  </div>
                )}

                <div className="p-4">
                  <BranchCard b={b} i={0} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
