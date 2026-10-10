import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { StoreProvider } from "@/components/store/StoreProvider";
import "./globals.css";

const onest = Onest({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "Tackle Room — outdoor gear catalog",
  description:
    "Browse outdoor and sporting goods loaded live from a public product API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={onest.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
