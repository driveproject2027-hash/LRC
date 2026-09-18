import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { referenceLogo } from "@/assets/referenceAssets";
import { scrollPageToTop } from "@/lib/scrollRoot";

const Footer = () => {
  return (
    <footer className="relative z-[1] bg-[var(--laya-bg-right)] text-white">
      <div className="container-narrow mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* About */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <img src={referenceLogo} alt="LAYA Logo" className="h-12 w-12 lg:h-14 lg:w-14 rounded-full object-cover mb-4 animate-logo-float" />
            </div>
            <p className="text-xs lg:text-sm opacity-80 leading-relaxed font-body">
              Resource Center for Adivasis. Working with indigenous communities of the Eastern Ghats since 1985.
            </p>
            <p className="text-xs lg:text-sm opacity-60 mt-3 font-body italic">
              'Laya' means rhythm - the cosmic balance of creation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider opacity-80">Explore</h4>
            <ul className="space-y-2">
              {[
                { label: "About LAYA", path: "/about" },
                { label: "What We Do", path: "/programs" },
                { label: "Stories", path: "/stories" },
                { label: "Publications", path: "/publications" },
                { label: "Team", path: "/team" },
                { label: "Impact", path: "/impact" },
                { label: "Gallery", path: "/gallery" },
                { label: "Donate", path: "/donate" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => scrollPageToTop()}
                    className="text-xs lg:text-sm opacity-70 hover:opacity-100 transition-opacity font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left">
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider opacity-80">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start justify-center lg:justify-start gap-2 text-xs lg:text-sm opacity-80 font-body">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="break-words">Plot No 110, D-No: 5-175/1, Yendada, Visakhapatnam - 530045, AP, India</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2 text-xs lg:text-sm opacity-80 font-body">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91-891-2737662</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-2 text-xs lg:text-sm opacity-80 font-body">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@laya.org.in</span>
              </li>
            </ul>
          </div>

          {/* Website */}
          <div className="text-center lg:text-left">
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider opacity-80">Connect</h4>
            <div className="flex justify-center lg:justify-start">
              <a
                href="https://www.laya.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs lg:text-sm opacity-80 hover:opacity-100 transition-opacity font-body"
              >
                www.laya.org.in <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-xs lg:text-sm opacity-60 mt-4 font-body">
              Founded in 1985 | Visakhapatnam, India
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs opacity-60 font-body">
            © {new Date().getFullYear()} LAYA - Resource Center for Adivasis. All rights reserved.
          </p>
          <p className="text-xs opacity-40 font-body">
            The LAYA Chronicle
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
