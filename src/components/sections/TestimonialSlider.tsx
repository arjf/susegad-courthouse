"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialSliderProps {
  reviews: Testimonial[];
  autoPlay: boolean;
}

export default function TestimonialSlider({ reviews, autoPlay }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), [reviews.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (!autoPlay || reviews.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, reviews.length, next]);

  if (reviews.length === 0) return null;

  const review = reviews[current];

  return (
    <div className="relative mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="mb-6 flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={20}
            className={i < review.rating ? "fill-accent1 text-accent1" : "text-border"}
          />
        ))}
      </div>
      <blockquote className="font-body text-lg leading-relaxed text-primary/80 italic">
        &ldquo;{review.review}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center justify-center gap-3">
        {review.image && (
          <img
            src={review.image}
            alt={review.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div className="text-left">
          <p className="font-heading text-base font-semibold text-primary">{review.name}</p>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          aria-label="Previous review"
        >
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? "bg-accent1" : "bg-border"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          aria-label="Next review"
        >
          <ChevronRight size={18} className="text-primary" />
        </button>
      </div>
    </div>
  );
}
