

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
      <svg width="20" height="20" viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#25D366" d="M12.013 2.006c-5.498 0-9.972 4.475-9.972 9.973 0 1.764.464 3.486 1.346 5.006L2.001 22l5.142-1.348c1.479.805 3.149 1.233 4.87 1.233 5.498 0 9.973-4.475 9.973-9.973 0-5.498-4.475-9.973-9.973-9.973z"/>
        <path fill="#FFFFFF" d="M17.483 14.156c-.3-.15-1.776-.877-2.052-.977-.276-.1-.477-.15-.678.15-.201.3-.776.977-.951 1.177-.176.2-.352.226-.652.076-2.046-1.026-3.551-2.42-4.148-3.447-.128-.217.135-.205.405-.745.086-.171.043-.321-.032-.471-.075-.15-.678-1.637-.928-2.24-.243-.585-.49-.505-.678-.515-.176-.009-.377-.01-.578-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.511 0 1.482 1.079 2.913 1.229 3.113.151.201 2.122 3.242 5.142 4.543 1.836.79 2.457.734 2.909.658.58-.098 1.776-.726 2.027-1.428.251-.702.251-1.303.176-1.428-.076-.126-.277-.201-.578-.351z"/>
      </svg>
      <span>WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
