"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon
const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: string };
delete DefaultIcon._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const { lat, lng } = siteConfig.contact.mapCoordinates;

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      }).setView([lat, lng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          `<b>${siteConfig.name}</b><br/>${siteConfig.contact.address}`
        );

      mapInstance.current = map;

      // Re-enable scroll after user interaction
      map.scrollWheelZoom.enable();

      return () => {
        map.remove();
        mapInstance.current = null;
      };
    }
  }, [lat, lng]);

  const coordsStr = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <section id="map" className="bg-primary/5 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
            Location
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl">
            Find Us in Goa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-primary/70">
            {siteConfig.contact.address}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-body text-sm text-accent1 transition-colors hover:text-accent1/80"
          >
            <MapPin size={14} />
            {coordsStr}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <div ref={mapRef} className="h-[400px] w-full" />
        </motion.div>
      </div>
    </section>
  );
}
