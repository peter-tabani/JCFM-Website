// Renders BreadcrumbList JSON-LD only — no visible UI. Lets Google show
// "jcfm.online > About" in search results instead of a raw URL. Skip this
// on the homepage (it IS the root, so a breadcrumb there is meaningless).
//
// Usage: <Breadcrumb items={[{ name: "About", path: "/about" }]} />
// "Home" is prepended automatically — don't include it yourself.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jcfm.online";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
