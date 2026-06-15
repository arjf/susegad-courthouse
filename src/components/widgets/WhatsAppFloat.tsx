import { MessageCircle } from "lucide-react";

interface WhatsAppFloatProps {
  phoneNumber: string;
  message: string;
}

export default function WhatsAppFloat({ phoneNumber, message }: WhatsAppFloatProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent1 text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-accent1/90"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
