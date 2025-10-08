// app/components/Branches.js
"use client";

import { useMemo, useState } from "react";
import Section from "@/app/components/Section";
import BranchCard from "@/app/components/BranchCard";
import { BRANCHES } from "@/app/lib/branches";
import { openNearestBranch } from "@/app/lib/openNearestBranch";
import { LocateFixed, Compass, MapPin, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast"; // npm i sonner (لو ما هو مركّب)

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

  // الفروع المتاحة الآن (استبعد "قريبًا")
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
    if (!distances) return BRANCHES; // قبل تحديد الموقع، أعرض كل الفروع كما هي
    const activeSorted = [...activeBranches].sort(
      (a, b) => distances[a.id] - distances[b.id]
    );
    const coming = BRANCHES.filter((b) => b.comingSoon);
    return [...activeSorted, ...coming];
  }, [distances, activeBranches]);

  function useMyLocation() {
    if (!navigator.geolocation) {
      toast.error("متصفحك لا يدعم تحديد الموقع. حدّث المتصفح وحاول مجددًا.");
      return;
    }
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error("استغرق تحديد الموقع وقتًا طويلاً. حاول مرة ثانية.");
    }, 10000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeout);
        setIsLoading(false);
        setMyPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success("تم تحديد موقعك! رتّبنا الفروع حسب القرب.");
      },
      (error) => {
        clearTimeout(timeout);
        setIsLoading(false);
        let msg = "لم نستطع تحديد موقعك. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg += "رجاءً اسمح بالوصول للموقع من إعدادات المتصفح.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg += "بيانات الموقع غير متوفرة حاليًا.";
            break;
          case error.TIMEOUT:
            msg += "انتهت مهلة تحديد الموقع. حاول مرة أخرى.";
            break;
          default:
            msg += "حدث خطأ غير معروف.";
        }
        toast.error(msg, { duration: 5000 });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }

  return (
    <Section
      id="branches"
      title="فروعنا"
      subtitle="فروع الرياض والخبر متاحة الآن — استخدم موقعك لعرض الأقرب أولًا. فرع الدمام قريبًا.">
      {/* أزرار التحكم */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={openNearestBranch}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          <LocateFixed className="w-5 h-5" />
          افتح أقرب فرع عبر Google Maps
        </button>

        <button
          onClick={useMyLocation}
          disabled={isLoading}
          className="btn-outline btn-nav disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Compass className="w-5 h-5" />
          )}
          {isLoading ? "نحدّد موقعك الآن..." : "رتّب حسب موقعي"}
        </button>
      </div>

      {/* شبكة البطاقات */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((b) => {
          const dist = distances && !b.comingSoon ? distances[b.id] : null;
          const isNearest = nearestId === b.id;

          return (
            <div
              key={b.id}
              className="
                relative rounded-3xl p-[1.5px]
                bg-gradient-to-br from-royal-600/40 via-ink-700 to-mint-600/30
                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              ">
              <div className="rounded-3xl glass-2 ring-1">
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

                {/* بطاقة الفرع */}
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
