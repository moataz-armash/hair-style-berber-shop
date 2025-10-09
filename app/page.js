import Hero from "@/app/components/Hero";
import Social from "@/app/components/Social";
import Testimonials from "@/app/components/Testimonials";
import FinalCTA from "@/app/components/FinalCTA";
import Benefits from "./components/Benefits";
import Offers from "./components/Offers";
import Branches from "./components/Branches";

const JsonLD = () => (
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HairSalon", // ✅ corrected
        name: "Hair Style",
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/og.jpg`,
        description:
          "صالون رجالي بخدمات قصّ الشعر والعناية بالبشرة والمساج. تقييم 5.0 من +186 مراجعة.",
        sameAs: [
          "https://www.instagram.com/hairstylesaudi/",
          "https://www.tiktok.com/@hair.style.saudi",
          "https://linktr.ee/hairstaylee",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "186",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "مراجع حقيقي", // ✅ acceptable
          },
          itemReviewed: {
            "@type": "HairSalon", // ✅ corrected
            name: "Hair Style",
          },
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

      <Branches />
      <Social />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
