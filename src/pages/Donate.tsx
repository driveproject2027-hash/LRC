import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BadgePercent,
  Check,
  Copy,
  Globe,
  Heart,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sprout,
  Users,
  Calendar,
} from "lucide-react";
import { referenceProgramImages } from "@/assets/referenceAssets";

const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const heroStats = [
  { value: "37+", label: "Years of Service", icon: Calendar },
  { value: "500+", label: "Villages Reached", icon: MapPin },
  { value: "10K+", label: "Families Impacted", icon: Users },
  { value: "80G", label: "Tax Exemption", icon: BadgePercent },
];

const impactAreas = [
  {
    icon: Users,
    title: "Adivasi Rights",
    description: "Legal advocacy, gram sabha empowerment, and PESA implementation across tribal villages.",
  },
  {
    icon: Sprout,
    title: "Food Sovereignty",
    description: "Millet farming revival, watershed management, and sustainable livelihood programs.",
  },
  {
    icon: Heart,
    title: "Herbal Healthcare",
    description: "Strengthening community-based herbal medicine systems in remote tribal areas.",
  },
  {
    icon: ShieldCheck,
    title: "Climate Resilience",
    description: "Building adaptive capacity for Adivasi communities facing climate change.",
  },
];

const foreignBankDetails = {
  "Account Holder": "LAYA",
  "Account Number": "063310011007529",
  "Swift Code": "ANDBINBB",
  "IFSC Code": "ANDB0000633",
  "Bank Name": "Andhra Bank, Waltair Branch",
  "Bank Address": "Lawsons Bay, Visakhapatnam",
  "Beneficiary Address":
    "LAYA Plot No.110, Near Senora Beach Resorts, Yendada, Visakhapatnam - 530045",
};

const domesticBankDetails = {
  "Account Holder": "LAYA",
  "Account Number": "063310011009657",
  "IFSC Code": "ANDB0000633",
  "Bank Name": "Andhra Bank, Waltair Branch",
  "Bank Address": "Lawsons Bay Colony, Visakhapatnam - 530017",
  "Beneficiary Address":
    "LAYA Plot No.110, Near Senora Beach Resorts, Yendada, Visakhapatnam - 530045",
};

type BankTab = "domestic" | "foreign";

const Donate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [bankTab, setBankTab] = useState<BankTab>("domestic");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "amount") setSelectedAmount(null);
  };

  const selectQuickAmount = (amount: number) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({ ...prev, amount: String(amount) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your generosity! Our team will contact you with payment details shortly.");
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const activeBankDetails = bankTab === "foreign" ? foreignBankDetails : domesticBankDetails;

  return (
    <>
      <Helmet>
        <title>Donate | Support LAYA</title>
        <meta
          name="description"
          content="Support LAYA's work with Adivasi communities through donations and partnerships."
        />
      </Helmet>
      <MainLayout>
        <section className="laya-section pt-8 lg:pt-10 pb-8 md:pb-12">
          <div className="container-narrow mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <p className="laya-label mb-4">Give with Purpose</p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5">
                  Support Our Mission
                </h1>
                <p className="text-lg text-white/85 font-body leading-relaxed max-w-lg mb-8">
                  Your contribution empowers Adivasi communities through rights, health, education,
                  and sustainable livelihoods across the Eastern Ghats.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-body font-medium border border-white/25">
                    <ShieldCheck className="h-4 w-4" />
                    Section 80G Tax Exempt
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-body font-medium border border-white/25">
                    <Heart className="h-4 w-4 text-accent" />
                    FCRA Registered
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/90 aspect-[5/4] lg:aspect-[4/3]">
                  <img
                    src={referenceProgramImages[1]}
                    alt="Support LAYA's work with Adivasi communities"
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
                </div>
                <div className="absolute -z-10 -bottom-4 -right-4 w-3/4 h-3/4 rounded-2xl bg-primary/15" />
                <div className="absolute -z-10 -top-3 -left-3 w-20 h-20 rounded-full bg-accent/25 blur-2xl" />
              </motion.div>
            </div>
          </div>

          <div className="container-narrow mx-auto px-4 pb-12 md:pb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="group relative rounded-xl border border-border bg-card p-4 md:p-5 text-center shadow-sm hover:shadow-md hover:border-primary/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="laya-section">
          <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10">
            <SectionHeading
              title="Where Your Donation Goes"
              subtitle="Every contribution directly supports grassroots programs with Adivasi communities"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {impactAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <area.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="laya-section pb-20 md:pb-28">
          <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
            <SectionHeading
              title="Make a Donation"
              subtitle="Fill in your details below or transfer directly to our bank account"
            />

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label className="font-body text-foreground">Select Amount (₹)</Label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_AMOUNTS.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => selectQuickAmount(amount)}
                          className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                            selectedAmount === amount
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-muted border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          ₹{amount.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-body">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="font-body">
                        Donation Amount (₹)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter custom amount"
                        required
                        min={1}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-body">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any specific purpose or dedication..."
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-base font-semibold">
                    Proceed to Donate
                  </Button>
                </form>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1">
                      Important Note
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      All donations to LAYA are eligible for tax exemption under Section 80G of the
                      Income Tax Act, 1961. You will receive a receipt via email within 3–5 working
                      days. For foreign contributions, please ensure compliance with FCRA regulations.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
                >
                  <div className="bg-primary px-6 py-4">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <Landmark className="h-5 w-5" />
                      <h3 className="font-heading font-semibold text-sm">Bank Transfer Details</h3>
                    </div>
                  </div>

                  <div className="p-4 border-b border-border">
                    <div className="flex rounded-lg bg-muted p-1 gap-1">
                      <button
                        type="button"
                        onClick={() => setBankTab("domestic")}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-body font-medium transition-all ${
                          bankTab === "domestic"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Landmark className="h-3.5 w-3.5" />
                        Domestic
                      </button>
                      <button
                        type="button"
                        onClick={() => setBankTab("foreign")}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-body font-medium transition-all ${
                          bankTab === "foreign"
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Foreign (FCRA)
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {Object.entries(activeBankDetails).map(([label, value]) => {
                      const fieldKey = `${bankTab}-${label}`;
                      return (
                        <div
                          key={label}
                          className="flex items-start justify-between gap-3 py-3 border-b border-border last:border-0"
                        >
                          <span className="text-xs text-muted-foreground font-body min-w-[110px] shrink-0 pt-0.5">
                            {label}
                          </span>
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <span className="text-sm font-medium text-foreground font-body text-right break-words leading-relaxed flex-1">
                              {value}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(value, fieldKey)}
                              className="p-1.5 hover:bg-muted rounded-md transition-colors shrink-0"
                              aria-label={`Copy ${label}`}
                            >
                              {copiedField === fieldKey ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm"
                >
                  <h3 className="font-heading font-semibold text-lg mb-4">Need Help?</h3>
                  <p className="text-sm text-primary-foreground/80 font-body mb-4">
                    Our team is happy to assist with donation queries, receipts, or partnership
                    opportunities.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:info@laya.org.in"
                      className="flex items-center gap-3 text-sm font-body hover:text-primary-foreground/90 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      info@laya.org.in
                    </a>
                    <a
                      href="tel:+918912737662"
                      className="flex items-center gap-3 text-sm font-body hover:text-primary-foreground/90 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      +91-891-2737662
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Donate;
