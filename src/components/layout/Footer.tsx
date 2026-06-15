import { Globe, MessageCircle, Camera, Send } from "lucide-react";
import type { ReactNode } from "react";

interface FooterProps {
  links: { label: string; href: string }[];
  socialLinks: { platform: string; href: string }[];
  logo: ReactNode;
}

const socialIcons: Record<string, ReactNode> = {
  facebook: <Globe size={18} />,
  instagram: <Camera size={18} />,
  youtube: <Send size={18} />,
  whatsapp: <MessageCircle size={18} />,
};

export default function Footer({ links, socialLinks, logo }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4">{logo}</div>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/70 max-w-md">
              Experience the art of Susegad living at our heritage courtyard home in Goa.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent1"
                  aria-label={social.platform}
                >
                  {socialIcons[social.platform]}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} The Susegad Courtyard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
