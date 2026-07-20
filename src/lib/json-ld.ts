import { siteConfig } from "@/lib/config";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function lodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.gallery.length > 0 ? siteConfig.gallery.map((g) => `${siteConfig.url}${g.src.startsWith("http") ? "" : ""}${g.src}`) : undefined,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Anjuna Beach",
      addressLocality: "Anjuna",
      addressRegion: "Goa",
      postalCode: "403509",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.mapCoordinates.lat,
      longitude: siteConfig.contact.mapCoordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.property.rating,
      reviewCount: siteConfig.property.reviewCount,
    },
    amenityFeature: siteConfig.property.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function jsonLdScript(json: Record<string, unknown>): string {
  return JSON.stringify(json, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
