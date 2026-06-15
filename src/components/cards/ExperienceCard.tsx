import { Clock } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import type { ExperienceCardProps } from "@/lib/types";

export default function ExperienceCard({ image, title, duration, price, tag }: ExperienceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
      <span className="absolute top-4 left-4 rounded-full bg-accent2 px-3 py-1 font-body text-xs font-medium text-primary-foreground">
        {tag}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading text-xl font-semibold text-primary-foreground">{title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-primary-foreground/70">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {duration}
          </span>
          <span className="font-heading text-lg font-bold text-accent1">₹{price}</span>
        </div>
        <div className="mt-4">
          <PrimaryButton text="Explore" variant="accent1" size="sm" />
        </div>
      </div>
    </div>
  );
}
