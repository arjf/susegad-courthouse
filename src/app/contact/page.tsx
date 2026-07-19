"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import AnimateIn from "@/components/ui/AnimateIn";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Mail, Phone, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("@/components/sections/MapSection"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-primary/5 animate-pulse rounded-2xl" />,
});

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website enquiry from ${name || "a guest"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <NavBar externalLinks={siteConfig.nav.external} />
      
      <main className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-24">
        <AnimateIn direction="up">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Get in Touch
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                Contact Us
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-primary/70">
                Have questions about your stay or want to book an experience? 
                Drop us a message and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              {/* Contact Form */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="mb-2 block font-body text-sm font-medium text-primary">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-transparent px-4 py-3 font-body text-sm text-primary placeholder:text-primary/40 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-body text-sm font-medium text-primary">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-transparent px-4 py-3 font-body text-sm text-primary placeholder:text-primary/40 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block font-body text-sm font-medium text-primary">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-lg border border-border bg-transparent px-4 py-3 font-body text-sm text-primary placeholder:text-primary/40 focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <PrimaryButton text="Send Message" size="lg" type="submit" className="w-full" />
                </form>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center gap-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent1/10 text-accent1">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary">Email</h3>
                    <p className="mt-1 font-body text-primary/70">{siteConfig.contact.email}</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="mt-2 inline-block font-body text-sm font-medium text-accent1 hover:text-accent2">
                      Drop us a line &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent1/10 text-accent1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary">Phone</h3>
                    <p className="mt-1 font-body text-primary/70">{siteConfig.contact.phone}</p>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="mt-2 inline-block font-body text-sm font-medium text-accent1 hover:text-accent2">
                      Call us &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent1/10 text-accent1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary">Location</h3>
                    <p className="mt-1 font-body text-primary/70 max-w-xs leading-relaxed">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </main>

      <div className="pb-12 md:pb-24">
        <MapSection />
      </div>

      <Footer />
      <WhatsAppFloat
        phoneNumber={siteConfig.social.whatsappNumber}
        message={siteConfig.social.whatsappMessage}
      />
    </>
  );
}
