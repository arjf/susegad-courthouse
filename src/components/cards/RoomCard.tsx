"use client";

import { motion } from "framer-motion";
import { Users, Wifi, Zap, Shirt, Refrigerator, CookingPot, DoorOpen } from "lucide-react";
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
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={12} />,
  "Power Backup": <Zap size={12} />,
  "Washing Machine": <Shirt size={12} />,
  "Stocked Kitchen": <CookingPot size={12} />,
  Fridge: <Refrigerator size={12} />,
  "Private Entrance": <DoorOpen size={12} />,
};

export default function RoomCard({ image, title, price, capacity, amenities, index = 0 }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <Card size="sm" className="group h-full">
        <div className="aspect-[4/3] overflow-hidden">
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
              ₹{price}
              <span className="font-body text-sm font-normal text-muted-foreground">/night</span>
            </span>
            <PrimaryButton text="View Room" variant="outline" size="sm" />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
