import { type ReactNode } from "react";

export interface NavBarProps {
  links: { label: string; href: string }[];
  isScrolled: boolean;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  bgImage?: string;
  bgVideo?: string;
}

export interface RoomCardProps {
  image: string;
  title: string;
  price: number;
  capacity: number;
  amenities: string[];
}

export interface ExperienceCardProps {
  image: string;
  title: string;
  duration: string;
  price: number;
  tag: string;
}

export interface PrimaryButtonProps {
  text: string;
  variant?: "accent1" | "accent2" | "outline";
  size?: "sm" | "default" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  image?: string;
}

export interface TestimonialSliderProps {
  reviews: Testimonial[];
  autoPlay: boolean;
}

export interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  lightbox: boolean;
}

export interface BookingWidgetProps {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  onSearch: (data: { checkIn: string; checkOut: string; guests: number }) => void;
}

export interface FooterProps {
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
  logo: ReactNode;
}

export interface WhatsAppFloatProps {
  phoneNumber: string;
  message: string;
}
