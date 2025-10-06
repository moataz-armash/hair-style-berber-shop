// app/components/CardSlider.js
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

export default function CardSlider({ items }) {
  if (!items?.length) return null;

  const sliderStyle = {
    width: "min(92vw, 520px)",
    height: "clamp(380px, 60vh, 640px)",
  };

  return (
    <section id="gallery" className="container py-12">
      <div className="flex items-center justify-center">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          style={sliderStyle}
          className="rounded-[28px]">
          {items.map((it, i) => {
            const Card = (
              <figure
                className="relative h-full w-full overflow-hidden rounded-[28px] bg-white shadow-xl ring-1 ring-black/5"
                title={it.alt}
                style={{
                  backgroundImage: it.blur ? `url(${it.blur})` : undefined,
                }}>
                <Image
                  src={it.src}
                  alt={it.alt || "صورة من المعرض"}
                  fill
                  sizes="(max-width: 640px) 92vw, 520px"
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
                  <a href={it.href} className="block h-full w-full">
                    {Card}
                  </a>
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
