import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://hairstyle.example"), // غيّر الرابط عند النشر
  title: {
    default: "Hair Style | صالون رجالي — قصّات عصرية وتجربة راقية",
    template: "%s | Hair Style",
  },
  description:
    "طلع بأناقة وعيش الثقة مع Hair Style — قصّات عصرية، عناية بالبشرة، مساج، عروض خاصة، و3 فروع قريبة منك. تقييم 4.9★ من أكثر من 170 مراجعة.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "Hair Style",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-sand-50 text-ink-900">
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
