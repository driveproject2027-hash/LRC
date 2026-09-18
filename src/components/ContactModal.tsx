import { useContactForm } from "@/hooks/use-contact-form";
import { MapPin, Phone, Mail, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const { formData, updateField, submit, isSubmitting, submitError } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit()) {
      alert("Thank you for your message! We will get back to you soon.");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-background rounded shadow-2xl border border-border"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-primary px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-primary-foreground">Contact Us</h2>
                <p className="text-sm text-primary-foreground/70 font-body">We'd love to hear from you</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-5 gap-6">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-foreground">Address</h3>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      Plot No 110, Yendada, Visakhapatnam – 530045, AP, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-foreground">Phone</h3>
                    <p className="text-xs text-muted-foreground font-body">+91-891-2737662</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-semibold text-foreground">Email</h3>
                    <p className="text-xs text-muted-foreground font-body">info@laya.org.in</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="md:col-span-3 space-y-3">
                {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-medium text-foreground block mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" variant="nature" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
