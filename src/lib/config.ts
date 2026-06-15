export const siteConfig = {
  name: "The Susegad Courtyard",
  tagline: "Come as a Guest, Leave as Family",
  description:
    "A heritage standalone home, five minutes from Anjuna Beach. Self-catered stays surrounded by nature-preserved greenery.",

  contact: {
    email: "hello@susegadcourtyard.com",
    phone: "+91 99999 99999",
    address: "Near Anjuna Beach, Anjuna, Goa 403509, India",
    mapCoordinates: { lat: 15.5839, lng: 73.7489 }, // 15°35'02.0"N 73°44'55.9"E
    anjunaBeachCoordinates: { lat: 15.576, lng: 73.7403 },
  },

  social: {
    instagram: "https://instagram.com/susegadcourtyard",
    facebook: "https://facebook.com/susegadcourtyard",
    whatsapp: "https://wa.me/919999999999",
    whatsappNumber: "919999999999",
    whatsappMessage: "Hi! I'd like to know more about The Susegad Courtyard.",
    youtube: "https://youtube.com/@susegadcourtyard",
    airbnb: "https://airbnb.com/h/susegad-courtyard",
  },

  booking: {
    airbnbUrl: "https://airbnb.com/h/susegad-courtyard",
    checkIn: "14:00",
    checkOut: "11:00",
  },

  pricing: {
    currency: "INR",
    rates: {
      inr: { symbol: "₹", label: "INR", rate: 1 },
      usd: { symbol: "$", label: "USD", rate: 0.012 },
      eur: { symbol: "€", label: "EUR", rate: 0.011 },
      gbp: { symbol: "£", label: "GBP", rate: 0.0095 },
    },
    defaultRegion: "inr",
  },

  property: {
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    minAnjunaBeach: "5 min walk",
    rating: 4.9,
    reviewCount: 42,
    amenities: [
      "WiFi",
      "Power Backup",
      "Washing Machine",
      "Stocked Kitchen",
      "Fridge",
      "Private Entrance",
      "Garden View",
      "Work Desk",
    ],
    noServices: true,
  },

  rooms: [
    {
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      title: "Entire Home — The Courtyard House",
      price: 12000,
      priceUSD: 145,
      capacity: 6,
      amenities: ["WiFi", "Power Backup", "Washing Machine", "Stocked Kitchen", "Fridge", "Private Entrance"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      title: "Master Suite — Garden View",
      price: 4500,
      priceUSD: 54,
      capacity: 2,
      amenities: ["WiFi", "Fridge", "Private Washroom", "Work Desk"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      title: "Standard Room — Courtyard Side",
      price: 3500,
      priceUSD: 42,
      capacity: 2,
      amenities: ["WiFi", "Shared Kitchen", "Washroom", "Furnished"],
    },
  ],

  experiences: [
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
  ],

  gallery: [
    { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80", alt: "Heritage Courtyard" },
    { src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80", alt: "Garden View" },
    { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", alt: "Cozy Bedroom" },
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", alt: "Outdoor Seating" },
    { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", alt: "Greenery Surroundings" },
    { src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80", alt: "Gate & Walkway" },
  ],

  testimonials: [
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
  ],

  nav: {
    external: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    sections: [
      { label: "Home", href: "#", icon: "Home" },
      { label: "Stay", href: "#stay", icon: "Bed" },
      { label: "Experiences", href: "#experiences", icon: "Compass" },
      { label: "Gallery", href: "#gallery", icon: "Image" },
      { label: "Reviews", href: "#reviews", icon: "Star" },
      { label: "Map", href: "#map", icon: "MapPin" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
