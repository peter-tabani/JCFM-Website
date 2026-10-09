"use client";

import { useEffect, useState } from "react";
import ImageCarousel, { type CarouselImage } from "@/components/ui/ImageCarousel";

// Mission trips carousel: admin uploads (Upload Photos → Mission Trips) first,
// then the built-in photos passed in from the page.
export default function MissionGallery({
  images,
  className,
}: {
  images: CarouselImage[];
  className?: string;
}) {
  const [uploads, setUploads] = useState<CarouselImage[]>([]);

  useEffect(() => {
    fetch("/api/media?section=missions")
      .then((r) => (r.ok ? r.json() : { media: [] }))
      .then((d: { media?: { type: string; url: string; title: string }[] }) =>
        setUploads(
          (d.media ?? [])
            .filter((m) => m.type === "image")
            .map((m) => ({ src: m.url, alt: m.title }))
        )
      )
      .catch(() => {});
  }, []);

  return <ImageCarousel images={[...uploads, ...images]} className={className} />;
}
