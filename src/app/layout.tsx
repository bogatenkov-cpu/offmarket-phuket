import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OffMarket Phuket",
  description: "Distress & resale properties in Phuket below market price",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
