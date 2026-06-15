"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface RoomCardProps {
  image: string;
  title: string;
  price: number;
  capacity: number;
  amenities: string[];
  index?: number;
  priceLabel?: string;
  symbol?: string;
}

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  "Power Backup": "⚡",
  "Washing Machine": "🧺",
  "Stocked Kitchen": "🍳",
  Fridge: "🧊",
  "Private Entrance": "🚪",
};

export default function RoomCard({
  image,
  title,
  price,
  capacity,
  amenities,
  index = 0,
  priceLabel = "/night",
  symbol = "₹",
}: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6 }}
    >
      <Card size="sm" className="group h-full">
        <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="mt-4">
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-lg font-semibold text-primary">{title}</h3>
            <Users size={16} className="mt-1 shrink-0 text-muted-foreground" />
          </div>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Up to {capacity} guests
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="gap-1">
                {amenityIcons[amenity] || null}
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <span className="font-heading text-2xl font-bold text-primary">
              {symbol}{price.toLocaleString("en-US")}
              <span className="font-body text-sm font-normal text-muted-foreground">{priceLabel}</span>
            </span>
            <PrimaryButton text="View Room" variant="outline" size="sm" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
