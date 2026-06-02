import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini AI HR",
  description: "AI-powered HR Admin System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
