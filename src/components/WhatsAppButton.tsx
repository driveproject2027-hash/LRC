import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918912737662"; // LAYA's phone number
const WHATSAPP_MESSAGE = "Hello! I'd like to know more about LAYA's programs.";

const WhatsAppButton = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-link"
    >
      <MessageCircle aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
