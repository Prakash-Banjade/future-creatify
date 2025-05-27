import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Future Creatify - The Education Hub",
    template: "%s | Future Creatify",
  },
  description:
    "Future Creatify is your go-to platform for educational resources, insights, and community engagement. Explore our blogs, courses, and more to enhance your learning journey.",
  keywords: [
    "education",
    "learning",
    "blogs",
    "courses",
    "resources",
    "community",
  ]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
