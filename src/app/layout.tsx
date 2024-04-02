import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import NextAuthProvider from "@/components/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Dcard Blog",
    default: "Dcard Blog",
  },
  description: "Dcard Frontend Intern Homework - https://drive.google.com/file/d/1x5l_hC5c26MauhTpACwGaa2nBUDo5uad/view",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dcardblog.imjustchew.com/",
    siteName: "Dcard Blog",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </NextAuthProvider>
    </html>
  );
}
