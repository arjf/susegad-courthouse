"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  lightbox: boolean;
}

export default function ImageGallery({ images, lightbox }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelected(index);
  const closeLightbox = () => setSelected(null);
  const next = () => setSelected((s) => (s !== null ? (s + 1) % images.length : null));
  const prev = () =>
    setSelected((s) => (s !== null ? (s - 1 + images.length) % images.length : null));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={lightbox ? () => openLightbox(index) : undefined}
            className={`group overflow-hidden rounded-lg ${
              lightbox ? "cursor-zoom-in" : "cursor-default"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {lightbox && selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 text-white/70 transition-colors hover:text-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={images[selected].src}
            alt={images[selected].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            onClick={next}
            className="absolute right-4 text-white/70 transition-colors hover:text-white"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-sm text-white/70">
            {selected + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
