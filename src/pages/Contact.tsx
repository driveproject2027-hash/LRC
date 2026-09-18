import { useState } from "react";
import { useContactForm } from "@/hooks/use-contact-form";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";

const Contact = () => {
  const { formData, updateField, submit, isSubmitting, submitError } = useContactForm();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submit()) {
      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "Thank you for your message! We will get back to you soon.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | LAYA – Resource Center for Adivasis</title>
        <meta name="description" content="Get in touch with LAYA. Visit us in Visakhapatnam or send us a message." />
      </Helmet>
      <MainLayout>
        <PageHero
          label="Get in Touch"
          title="Contact Us"
          subtitle="We'd love to hear from you"
          centered
        />

        <section className="laya-section pb-20 md:pb-28">
          <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">Address</h3>
                      <p className="text-sm text-muted-foreground font-body">
                        Plot No 110, D-No: 5-175/1, Behind Bay Crown Apartment,
                        Yendada, Visakhapatnam – 530045, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">Phone</h3>
                      <p className="text-sm text-muted-foreground font-body">+91-891-2737662</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground font-body">info@laya.org.in</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Send a Message</h2>
                {submitted ? (
                  <div className="flex items-start gap-3 rounded border border-[var(--laya-cyan)]/40 bg-[var(--laya-cyan)]/10 p-5 text-foreground" role="status">
                    <CheckCircle2 className="h-5 w-5 text-[var(--laya-purple)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading text-sm font-semibold">Message sent!</p>
                      <p className="text-sm text-muted-foreground font-body mt-1">
                        Thank you for reaching out — our team will get back to you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
                <div>
                  <label htmlFor="name" className="block text-sm font-body text-foreground mb-1.5">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-body text-foreground mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-body text-foreground mb-1.5">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full px-4 py-3 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-body text-foreground mb-1.5">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full px-4 py-3 rounded border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  <Send className="h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                  </>
                )}
              </motion.form>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Contact;
