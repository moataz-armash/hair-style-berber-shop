import Hero from "@/app/components/Hero";
import Social from "@/app/components/Social";
import Testimonials from "@/app/components/Testimonials";
import FinalCTA from "@/app/components/FinalCTA";
import Benefits from "./components/Benefits";
import Offers from "./components/Offers";
import Branches from "./components/Branches";
import GallerySection from "./components/CardSlider";
import { gallery } from "./lib/gallery";

const JsonLD = () => (
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Barbershop",
        name: "Hair Style",
        image: "https://hairstyle.example/og.jpg",
        description:
          "صالون رجالي بخدمات قصّ الشعر والعناية بالبشرة والمساج. تقييم 4.9 من +170 مراجعة.",
        sameAs: [
          "https://www.instagram.com/hairstylesaudi/",
          "https://www.tiktok.com/@hair.style.saudi",
          "https://linktr.ee/hairstaylee",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "170",
        },
      }),
    }}
  />
);

export default function Page() {
  return (
    <main>
      <JsonLD />
      <Hero />
      <Benefits />
      <Offers />
      {/* <GallerySection
        items={gallery}
        // title="Crafted Highlights"
        // description="Ten handpicked shots that showcase materials, texture, and the small details our customers love."
      /> */}
      <Branches />
      <Social />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
