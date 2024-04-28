import "@styles/globals.css";
import {Inter as FontSans} from "next/font/google";
import type {Metadata} from "next";
import {cn} from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "aurora",
    template: "%s | aurora",
  },
  description: "aurora",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn(" bg-background font-sans antialiased overflow-hidden", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
