import NavBar from "@/components/layout/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import RoomCard from "@/components/cards/RoomCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import ImageGallery from "@/components/sections/ImageGallery";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Stay", href: "#stay" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { platform: "facebook", href: "https://facebook.com" },
  { platform: "instagram", href: "https://instagram.com" },
  { platform: "youtube", href: "https://youtube.com" },
  { platform: "whatsapp", href: "https://wa.me/919999999999" },
];

const rooms = [
  {
    image: "/rooms/heritage-king.jpg",
    title: "Heritage King Room",
    price: 8500,
    capacity: 2,
    amenities: ["King Bed", "Private Balcony", "Hammock", "Mini Bar"],
  },
  {
    image: "/rooms/garden-suite.jpg",
    title: "Garden Suite",
    price: 12000,
    capacity: 3,
    amenities: ["King Bed", "Garden Access", "Outdoor Shower", "Butler Service"],
  },
  {
    image: "/rooms/courtyard-villa.jpg",
    title: "Courtyard Villa",
    price: 18000,
    capacity: 5,
    amenities: ["Two Bedrooms", "Private Pool", "Courtyard", "Chef Service"],
  },
];

const experiences = [
  {
    image: "/experiences/cooking.jpg",
    title: "Goan Cooking Masterclass",
    duration: "3 Hours",
    price: 2500,
    tag: "Food & Culture",
  },
  {
    image: "/experiences/village-walk.jpg",
    title: "Village Heritage Walk",
    duration: "2 Hours",
    price: 1500,
    tag: "Nature & Adventure",
  },
  {
    image: "/experiences/spice-plantation.jpg",
    title: "Spice Plantation Tour",
    duration: "4 Hours",
    price: 3000,
    tag: "Experiences",
  },
  {
    image: "/experiences/yoga.jpg",
    title: "Sunrise Yoga by the Pool",
    duration: "1 Hour",
    price: 1000,
    tag: "Wellness",
  },
];

const galleryImages = [
  { src: "/gallery/courtyard.jpg", alt: "Heritage Courtyard" },
  { src: "/gallery/pool.jpg", alt: "Infinity Pool" },
  { src: "/gallery/veranda.jpg", alt: "Colonial Veranda" },
  { src: "/gallery/spice-garden.jpg", alt: "Spice Garden" },
  { src: "/gallery/sunset.jpg", alt: "Goan Sunset" },
  { src: "/gallery/dining.jpg", alt: "Al Fresco Dining" },
];

const testimonials = [
  {
    id: "1",
    name: "Priya & Arjun Mehta",
    review: "An absolute gem in the heart of Goa. The heritage, the hospitality, and the food transported us to another era. We didn't just stay — we lived the Susegad life.",
    rating: 5,
    image: "/testimonials/couple.jpg",
  },
  {
    id: "2",
    name: "Sarah Chen",
    review: "As a solo traveler, I felt completely at home. The staff remembered my name, my coffee order, and even recommended hidden beaches. Magical experience.",
    rating: 5,
    image: "/testimonials/solo.jpg",
  },
  {
    id: "3",
    name: "Rahul Verma",
    review: "The workation package is a game changer. Blazing fast WiFi, a dedicated workspace in a 200-year-old courtyard, and Goan curry for lunch. Productivity never felt this good.",
    rating: 4,
    image: "/testimonials/workation.jpg",
  },
];

export default function Home() {
  return (
    <>
      <NavBar links={navLinks} />
      <HeroSection />

      <section id="about" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
              Our Story
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
              Come as a Guest, Leave as Family
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-primary/70">
              Nestled in the heart of Goa, The Susegad Courtyard is a lovingly restored
              heritage home that has welcomed travelers for over a century. Every wall
              tells a story, every meal is a celebration, and every guest becomes part of
              our family. Here, time slows down, conversations flow, and the true spirit
              of Goa wraps around you like a warm embrace.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <p className="font-heading text-3xl font-bold text-accent1">1892</p>
                <p className="mt-1 font-body text-sm text-primary/60">Established</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-accent1">4.9</p>
                <p className="mt-1 font-body text-sm text-primary/60">Guest Rating</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-accent1">150+</p>
                <p className="mt-1 font-body text-sm text-primary/60">5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stay" className="bg-primary/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
              Stay
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
              Heritage Rooms & Suites
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
              Each room is a sanctuary of comfort, designed to reflect Goa&apos;s rich
              cultural tapestry while offering every modern convenience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.title} {...room} />
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
              Experiences
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
              Live the Susegad Life
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
              From spice plantation tours to Goan cooking classes, every experience is
              designed to connect you with the soul of Goa.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.title} {...exp} />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-primary/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
              Gallery
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
              A Glimpse of Paradise
            </h2>
          </div>
          <ImageGallery images={galleryImages} lightbox={true} />
        </div>
      </section>

      <section id="reviews" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
              Testimonials
            </span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
              Loved by Travelers
            </h2>
          </div>
          <TestimonialSlider reviews={testimonials} autoPlay={true} />
        </div>
      </section>

      <Footer
        links={footerLinks}
        socialLinks={socialLinks}
        logo={
          <span className="font-heading text-2xl font-bold text-primary-foreground">
            Susegad
          </span>
        }
      />
      <WhatsAppFloat phoneNumber="919999999999" message="Hi! I'd like to know more about The Susegad Courtyard." />
    </>
  );
}
