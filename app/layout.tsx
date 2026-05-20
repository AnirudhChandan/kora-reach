import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReadingProgress from "@/components/ReadingProgress";
import FloatingHelp from "@/components/FloatingHelp";
import { ToastProvider } from "@/components/Toast";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Kora Reach | NDIS Disability Support Services Melbourne",
    template: "%s | Kora Reach",
  },
  description:
    "Quality NDIS disability support services in Melbourne. Community participation, daily living, capacity building, and transport support.",
  metadataBase: new URL("https://korareach.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Kora Reach",
    title: "Kora Reach | NDIS Disability Support Services Melbourne",
    description:
      "Empowering NDIS participants across Melbourne to live independently and participate fully in their community.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kora Reach Support Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kora Reach | NDIS Support Melbourne",
    description:
      "Empowering NDIS participants across Melbourne to live independently and participate fully in their community.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${inter.variable} ${merriweather.variable} font-sans`}
        >
          <ThemeProvider>
          <ToastProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <CursorGlow />
            <ReadingProgress />
            <div className="noise-overlay" aria-hidden="true"></div>
            <TopBanner />
            <Navbar />
            <main id="main-content" className="min-h-screen relative z-10">{children}</main>
            <Footer />
            <FloatingHelp />
          </ToastProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
