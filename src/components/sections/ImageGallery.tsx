"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  lightbox: boolean;
}

export default function ImageGallery({ images, lightbox }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelected(index);
  const closeLightbox = () => setSelected(null);
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected((s) => (s !== null ? (s + 1) % images.length : null));
  };
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected((s) => (s !== null ? (s - 1 + images.length) % images.length : null));
  };

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      } else if (e.key === "ArrowRight") {
        setSelected((s) => (s === null ? null : (s + 1) % images.length));
      } else if (e.key === "ArrowLeft") {
        setSelected((s) => (s === null ? null : (s - 1 + images.length) % images.length));
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, images.length]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            onClick={lightbox ? () => openLightbox(index) : undefined}
            className={`group relative block overflow-hidden rounded-lg ${
              lightbox ? "cursor-zoom-in" : "cursor-default"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            aria-label={lightbox ? `View ${image.alt}` : undefined}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => prev(e)}
              className="absolute left-4 text-white/70 transition-colors hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.div
              key={images[selected].src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected].src}
                alt={images[selected].alt}
                width={1600}
                height={1200}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </motion.div>
            <button
              onClick={(e) => next(e)}
              className="absolute right-4 text-white/70 transition-colors hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-sm text-white/70">
              {selected + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
