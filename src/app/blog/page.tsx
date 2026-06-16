"use client";

import { siteConfig } from "@/lib/config";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/widgets/WhatsAppFloat";
import AnimateIn from "@/components/ui/AnimateIn";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// Mock blog data
const blogPosts = [
  {
    id: "1",
    title: "A Guide to Slow Living in Anjuna",
    excerpt: "Discover the hidden, quieter side of North Goa. From secret cafes to untouched walking trails, here is how you can experience true Susegad.",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    category: "Lifestyle",
  },
  {
    id: "2",
    title: "Essential Goan Recipes You Can Cook at the Courtyard",
    excerpt: "Make the most of our fully-stocked kitchen by trying out these three simple, authentic Goan recipes using local ingredients.",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1626776876729-bab43bcebbe7?w=800&q=80",
    category: "Food & Culture",
  },
  {
    id: "3",
    title: "The Best Time to Visit Goa for Nature Lovers",
    excerpt: "Why the monsoons and post-monsoon months are secretly the best times to visit Goa if you want to experience its lush, green landscapes.",
    date: "Aug 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1542152864-704d90956557?w=800&q=80",
    category: "Travel Guide",
  },
  {
    id: "4",
    title: "Working Remotely from Goa: A Survival Guide",
    excerpt: "With power backup and fast WiFi, the Courtyard is perfect for remote work. Here are tips to maintain productivity while enjoying the beach life.",
    date: "Jul 02, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&q=80",
    category: "Workation",
  },
];

export default function BlogPage() {
  return (
    <>
      <NavBar externalLinks={siteConfig.nav.external} />
      
      <main className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-24">
        <AnimateIn direction="up">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <span className="font-body text-sm font-medium uppercase tracking-widest text-accent1">
                Our Journal
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                Stories from Goa
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-primary/70">
                Insights, travel guides, and local secrets to help you make the most of your time in Anjuna and beyond.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              {blogPosts.map((post, i) => (
                <AnimateIn key={post.id} direction="up" delay={i * 0.1}>
                  <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-md">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-body text-xs font-medium text-primary backdrop-blur-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="mb-4 flex items-center gap-4 font-body text-xs text-primary/60">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mb-3 font-heading text-2xl font-bold text-primary transition-colors group-hover:text-accent1">
                        {post.title}
                      </h2>
                      <p className="mb-6 flex-1 font-body leading-relaxed text-primary/70">
                        {post.excerpt}
                      </p>
                      <Link 
                        href={`/blog`} 
                        className="inline-flex w-fit items-center gap-2 font-body text-sm font-medium text-accent1 transition-colors hover:text-accent2"
                      >
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>
      </main>

      <Footer
        links={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ]}
        socialLinks={[
          { platform: "facebook", href: siteConfig.social.facebook },
          { platform: "instagram", href: siteConfig.social.instagram },
          { platform: "youtube", href: siteConfig.social.youtube },
          { platform: "whatsapp", href: siteConfig.social.whatsapp },
        ]}
        logo={
          <span className="font-heading text-2xl font-bold text-primary-foreground">
            {siteConfig.name.split(" ").slice(-1)[0]}
          </span>
        }
      />
      <WhatsAppFloat
        phoneNumber={siteConfig.social.whatsappNumber}
        message={siteConfig.social.whatsappMessage}
      />
    </>
  );
}
