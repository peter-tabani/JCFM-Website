import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import NavigationLock from "@/components/NavigationLock";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Jesus Christ Founder Ministry",
  description: "Jesus Christ Founder Ministry (JCFM) — a Christ-centred church community rooted in Nzoia, Bungoma, reaching across Kenya through faith, education, and outreach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable}`}>
        <NavigationLock>
          <AuthProvider>{children}</AuthProvider>
        </NavigationLock>
      </body>
    </html>
  );
}