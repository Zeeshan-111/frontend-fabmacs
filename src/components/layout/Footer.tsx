import { Link } from "wouter";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const productLinks = [
  { label: "Belt Conveyor", href: "/products/belt-conveyor" },
  { label: "Modular Belt Conveyor", href: "/products/modular-belt-conveyor" },
  { label: "Screw Conveyor", href: "/products/screw-conveyor" },
  { label: "Bucket Elevator", href: "/products/bucket-elevator" },
  { label: "Ribbon Blender", href: "/products/ribbon-blender" },
  { label: "Auger Filler", href: "/products/auger-filler" },
];

const industryLinks = [
  { label: "Food Processing", href: "/industries/food-processing" },
  { label: "Pharmaceutical", href: "/industries/pharmaceutical" },
  { label: "Chemical", href: "/industries/chemical" },
  { label: "Nutraceutical", href: "/industries/nutraceutical" },
  { label: "Dairy", href: "/industries/dairy" },
  { label: "Agriculture", href: "/industries/agriculture" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="/logo-fabmacs.jpg"
                alt="FABMACS INNOVATION"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-[#BFC5CC] text-sm leading-relaxed mb-6">
              Engineering precision material handling, conveying, mixing, filling, and packaging equipment for India's most demanding industries.
            </p>
            <div className="space-y-3">
              <a href="tel:+919354900604" className="flex items-center gap-2 text-sm text-[#BFC5CC] hover:text-white transition-colors group">
                <Phone size={15} className="text-[#2E7AF9] group-hover:text-[#2E7AF9] shrink-0" />
                +91 9354900604
              </a>
              <a href="mailto:info@fabmacs.com" className="flex items-center gap-2 text-sm text-[#BFC5CC] hover:text-white transition-colors group">
                <Mail size={15} className="text-[#2E7AF9] shrink-0" />
                info@fabmacs.com
              </a>
              <div className="flex items-start gap-2 text-sm text-[#BFC5CC]">
                <MapPin size={15} className="text-[#2E7AF9] shrink-0 mt-0.5" />
                <span>Plot No. 18, 16/6 Mathura Road,<br />Old Faridabad, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BFC5CC] mb-5">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-[#BFC5CC] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#2E7AF9]" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products">
                  <span className="text-sm text-[#2E7AF9] hover:text-white transition-colors cursor-pointer">View all products →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BFC5CC] mb-5">Industries</h3>
            <ul className="space-y-2.5">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-[#BFC5CC] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#2E7AF9]" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & CTA */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BFC5CC] mb-5">Company</h3>
            <ul className="space-y-2.5 mb-8">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-[#BFC5CC] hover:text-white transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-[#0F3D8F]/40 border border-[#0F3D8F]/50">
              <p className="text-sm font-medium text-white mb-1">Need a custom solution?</p>
              <p className="text-xs text-[#BFC5CC] mb-3">Our engineers are ready to help design the right system for your plant.</p>
              <Link href="/contact">
                <span className="text-sm font-semibold text-[#2E7AF9] hover:text-white transition-colors cursor-pointer">Talk to an engineer →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#BFC5CC]">
            &copy; {new Date().getFullYear()} FABMACS INNOVATION. All rights reserved.
          </p>
          <p className="text-xs text-[#BFC5CC]">
            Plot No. 18, 16/6 Mathura Road, Old Faridabad, Haryana 121002, India
          </p>
          <p className="text-xs text-[#BFC5CC]">
            Built by{" "}
            <a
              href="https://zeeonix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2E7AF9] hover:text-white transition-colors underline underline-offset-2"
            >
              Zeeonix.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
