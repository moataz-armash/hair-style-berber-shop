// app/components/CardSlider.js
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Link from "next/link";

export default function CardSlider({ items }) {
  if (!items?.length) return null;

  return (
    <section id="gallery" className="container py-8 sm:py-12 lg:py-16">
      <div className="flex items-center justify-center px-4 sm:px-6">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="w-full max-w-[340px] h-[480px] sm:max-w-[420px] sm:h-[560px] md:max-w-[480px] md:h-[620px] lg:max-w-[520px] lg:h-[560px] rounded-2xl sm:rounded-[28px]">
          {items.map((it, i) => {
            const Card = (
              <figure
                className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-[28px] bg-white shadow-xl ring-1 ring-black/5"
                title={it.alt}
                style={{
                  backgroundImage: it.blur ? `url(${it.blur})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                <Image
                  src={it.src}
                  alt={it.alt || "صورة من المعرض"}
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, (max-width: 1024px) 480px, 520px"
                  priority={i < 2}
                  className="object-cover"
                />
              </figure>
            );

            return (
              <SwiperSlide
                key={it.src + i}
                className="
                  !flex !items-center !justify-center
                  !bg-transparent
                  before:!hidden after:!hidden
                ">
                {it.href ? (
                  <Link
                    href={it.href}
                    className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-2xl sm:rounded-[28px]">
                    {Card}
                  </Link>
                ) : (
                  Card
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
