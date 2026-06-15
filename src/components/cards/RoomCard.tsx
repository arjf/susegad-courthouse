import { Users } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import type { RoomCardProps } from "@/lib/types";

export default function RoomCard({ image, title, price, capacity, amenities }: RoomCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-primary">{title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users size={14} />
            Up to {capacity} guests
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-secondary px-3 py-1 font-body text-xs text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-heading text-2xl font-bold text-primary">
            ₹{price}
            <span className="font-body text-sm font-normal text-muted-foreground">/night</span>
          </span>
          <PrimaryButton text="View Room" variant="outline" size="sm" />
        </div>
      </div>
    </div>
  );
}
