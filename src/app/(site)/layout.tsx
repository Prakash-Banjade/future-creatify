import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Footer from "@/components/site/footer/footer";
import { Toaster } from "sonner";
import Navbar from "@/components/site/navbar";
import { QCProvider } from "@/context/query-client-provider";

const playFair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Future Creatify",
    template: "%s | Future Creatify",
  },
};

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <html lang="en">
      <QCProvider>
        <body className={`${playFair.style} ${inter.variable} antialiased`}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
          <Toaster richColors />
        </body>
      </QCProvider>
    </html>
  );
}