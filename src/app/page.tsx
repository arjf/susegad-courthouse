import NavBar from "@/components/layout/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import RoomCard from "@/components/cards/RoomCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import ImageGallery from "@/components/sections/ImageGallery";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import AnimateIn from "@/components/ui/AnimateIn";

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
  { label: "Rooms", href: "#stay" },
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
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    title: "Entire Home — The Courtyard House",
    price: 12000,
    capacity: 6,
    amenities: ["WiFi", "Power Backup", "Washing Machine", "Stocked Kitchen", "Fridge", "Private Entrance"],
  },
  {
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    title: "Master Suite — Garden View",
    price: 4500,
    capacity: 2,
    amenities: ["WiFi", "Fridge", "Private Washroom", "Work Desk"],
  },
  {
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    title: "Standard Room — Courtyard Side",
    price: 3500,
    capacity: 2,
    amenities: ["WiFi", "Shared Kitchen", "Washroom", "Furnished"],
  },
];

const experiences = [
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    title: "Goan Cooking Session",
    duration: "3 Hours",
    price: 2500,
    tag: "Food & Culture",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    title: "Anjuna Beach Walk",
    duration: "2 Hours",
    price: 0,
    tag: "Nature & Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80",
    title: "Spice Plantation Tour",
    duration: "4 Hours",
    price: 3000,
    tag: "Nature & Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    title: "Sunrise Yoga in the Garden",
    duration: "1 Hour",
    price: 0,
    tag: "Wellness",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80", alt: "Heritage Courtyard" },
  { src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80", alt: "Garden View" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", alt: "Cozy Bedroom" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", alt: "Outdoor Seating" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", alt: "Greenery Surroundings" },
  { src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80", alt: "Gate & Walkway" },
];

const testimonials = [
  {
    id: "1",
    name: "Priya & Arjun Mehta",
    review: "The house is exactly as described — peaceful, private, and surrounded by greenery. We loved cooking in the stocked kitchen and walking to Anjuna beach in under 10 minutes. No frills, just authentic Goa.",
    rating: 5,
    image: "",
  },
  {
    id: "2",
    name: "Sarah Chen",
    review: "As a solo traveler working remotely, this was perfect. The WiFi was reliable, the workspace comfortable, and the garden view was my daily inspiration. Felt like my own Goan home.",
    rating: 5,
    image: "",
  },
  {
    id: "3",
    name: "Rahul Verma",
    review: "If you want a quiet, self-sufficient stay away from resort chaos, this is it. Walked to Anjuna flea market, cooked our own meals, and sat in the garden every evening. The gate and walkway give it a nice sense of privacy.",
    rating: 4,
    image: "",
  },
];

export default function Home() {
  return (
    <>
      <NavBar links={navLinks} />
      <HeroSection />

      <AnimateIn direction="up">
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
                A modest standalone home, five minutes from Anjuna Beach, tucked behind an
                inward walkway with a private gate. Surrounded by nature-preserved plots,
                our courtyard house offers the space and solitude Goa is meant for. No
                resort frills — just a stocked kitchen, reliable WiFi, a washing machine,
                and the freedom to live at your own pace.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-primary/60">
                <em>Self-catered stay. No breakfast, cleaning, or food delivery services.</em>
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8 border-t border-border pt-8">
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">3</p>
                  <p className="mt-1 font-body text-sm text-primary/60">Bedrooms</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">5 min</p>
                  <p className="mt-1 font-body text-sm text-primary/60">Anjuna Beach</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-bold text-accent1">4.9</p>
                  <p className="mt-1 font-body text-sm text-primary/60">Guest Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
        <section id="stay" className="bg-primary/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Stay
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                Your Home in Goa
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
                Book the entire home or a single room. Everything you need, nothing you don&apos;t.
                Stocked kitchen, fast WiFi, washing machine, and a garden view of protected greenery.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room, i) => (
                <RoomCard key={room.title} {...room} index={i} />
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
        <section id="experiences" className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Experiences
              </span>
              <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
                Discover Goa Your Way
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
                Walk to Anjuna Beach, cook local recipes, explore spice plantations, or do yoga
                in the garden. Curated experiences, zero fluff.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.title} {...exp} index={i} />
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn direction="up" delay={0.1}>
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
      </AnimateIn>

      <AnimateIn direction="up">
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
      </AnimateIn>

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
