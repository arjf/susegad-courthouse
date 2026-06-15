"use client";

import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialSliderProps {
  reviews: Testimonial[];
  autoPlay: boolean;
}

export default function TestimonialSlider({ reviews, autoPlay }: TestimonialSliderProps) {
  if (reviews.length === 0) return null;

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
        duration: autoPlay ? 40 : 20,
      }}
      className="mx-auto max-w-2xl px-12"
    >
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id}>
            <div className="flex flex-col items-center py-8 text-center">
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
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={review.image || undefined}
                    alt={review.name}
                  />
                  <AvatarFallback>
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-heading text-base font-semibold text-primary">
                    {review.name}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
