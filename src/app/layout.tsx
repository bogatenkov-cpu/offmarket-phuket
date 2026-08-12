import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OffMarket Phuket",
  description: "Distress & resale properties in Phuket below market price",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={golosText.variable}>
      <body className="bg-white text-[#161412] antialiased font-sans">{children}</body>
    </html>
  );
}
