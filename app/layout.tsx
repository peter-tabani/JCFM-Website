import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { siteData } from "@/data/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";
const SITE_TITLE = "Jesus Christ Founder Ministry";
const SITE_DESCRIPTION =
  "Jesus Christ Founder Ministry (JCFM) — a Christ-centred church community rooted in Nzoia, Bungoma and now headquartered in Miritini, Mombasa, reaching across Kenya through faith, education, and outreach.";

export const metadata: Metadata = {
  // Required for Open Graph/Twitter image URLs to resolve to absolute
  // URLs — without this, social platforms and email clients can't fetch
  // the preview image and just fall back to a plain link.
  metadataBase: new URL(SITE_URL),
  // Plain string, not a { default, template } object — child pages already
  // self-suffix with the org name (e.g. "Donate — Jesus Christ Founder
  // Ministry"), so a template here would double it up.
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
    url: SITE_URL,
    locale: "en_US",
    type: "website",
    // Image itself comes from app/opengraph-image.png (Next's file
    // convention) — every page inherits it unless it defines its own.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    // Next.js only auto-detects exact filenames (favicon.ico, icon.png,
    // apple-icon.png) from app/ — these differently-named files need to be
    // wired up explicitly, otherwise everything but favicon.ico is dead weight.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// Site-wide structured data so Google can understand JCFM as a real-world
// church (name, logo, HQ address, founder) and potentially show it as a
// Knowledge Panel / rich result. schema.org's "Church" type doesn't carry
// "logo" itself, so we mix in Organization-style fields — Google's parser
// accepts the extra properties even if the strict schema.org type doesn't
// formally define them.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: siteData.orgName,
  alternateName: siteData.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description: SITE_DESCRIPTION,
  foundingDate: siteData.founded,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteData.location,
    addressCountry: "KE",
  },
  founder: {
    "@type": "Person",
    name: "Rev. Noah Mweruphe",
  },
  // No public phone line in siteData yet — add "telephone" here once one
  // exists rather than publishing a placeholder number.
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteData.email,
      areaServed: "KE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}