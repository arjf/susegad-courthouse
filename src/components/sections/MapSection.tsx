"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: string };
delete DefaultIcon._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapSectionProps {
  compact?: boolean;
}

export default function MapSection({ compact }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const { lat, lng } = siteConfig.contact.mapCoordinates;
  const beach = siteConfig.contact.anjunaBeachCoordinates;

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Property marker
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(
        `<b>${siteConfig.name}</b><br/>${siteConfig.contact.address}`
      );

      // Anjuna Beach marker
      const beachIcon = L.divIcon({
        className: "",
        html: `<div style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#B08D57;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:12px;line-height:1;">🏖️</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const beachMarker = L.marker([beach.lat, beach.lng], { icon: beachIcon }).addTo(map);
      beachMarker.bindPopup("<b>Anjuna Beach</b><br/>~5 min walk");

      // Dotted route line from property to beach
      L.polyline(
        [
          [lat, lng],
          [beach.lat, beach.lng],
        ],
        {
          color: "#B08D57",
          weight: 2.5,
          dashArray: "8, 10",
          opacity: 0.8,
        }
      ).addTo(map);

      // Fit bounds to show both markers
      const bounds = L.latLngBounds([lat, lng], [beach.lat, beach.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });

      mapInstance.current = map;

      // Re-enable scroll after user interaction
      map.scrollWheelZoom.enable();

      return () => {
        map.remove();
        mapInstance.current = null;
      };
    }
  }, [lat, lng, beach.lat, beach.lng]);

  const coordsStr = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  if (compact) {
    return (
      <div className="w-full">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div ref={mapRef} className="h-[250px] w-full sm:h-[300px]" />
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-body text-xs text-muted-foreground transition-colors hover:text-accent1"
        >
          <MapPin size={12} />
          Open in Google Maps
        </a>
      </div>
    );
  }

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
