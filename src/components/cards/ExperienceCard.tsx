"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface ExperienceCardProps {
  image: string;
  title: string;
  duration: string;
  price: number;
  tag: string;
  index?: number;
  symbol?: string;
  rate?: number;
}

export default function ExperienceCard({
  image,
  title,
  duration,
  price,
  tag,
  index = 0,
  symbol = "₹",
  rate = 1,
}: ExperienceCardProps) {
  const displayPrice =
    price === 0 ? "Free" : `${symbol}${Math.round(price * rate).toLocaleString("en-US")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
    >
      <Card className="group relative h-full overflow-hidden border-0">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 bg-accent2 text-primary-foreground hover:bg-accent2"
        >
          {tag}
        </Badge>
        <CardContent className="absolute bottom-0 left-0 right-0">
          <h3 className="font-heading text-xl font-semibold text-primary-foreground">{title}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {duration}
            </span>
            <span className="font-heading text-lg font-bold text-accent1">{displayPrice}</span>
          </div>
          <div className="mt-4">
            <PrimaryButton text="Explore" variant="accent1" size="sm" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
