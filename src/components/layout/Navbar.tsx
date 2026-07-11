import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { open } = useQuoteModal();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
        scrolled || !isHome
          ? "bg-white/95 border-b border-[#BFC5CC]/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/">
            <div className="cursor-pointer bg-[#0D1B2A] px-5 py-3 rounded-xl">
              <img
                src="/logo-fabmacs.jpg"
                alt="FABMACS INNOVATION"
                className="h-14 lg:h-16 xl:h-20 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    location === link.href
                      ? "text-[#0F3D8F] bg-[#0F3D8F]/8"
                      : scrolled || !isHome
                      ? "text-[#0D1B2A] hover:text-[#0F3D8F] hover:bg-[#0F3D8F]/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919354900604"
              className={`text-sm font-medium transition-colors ${
                scrolled || !isHome ? "text-[#0F3D8F]" : "text-white/80 hover:text-white"
              }`}
            >
              +91 93549 00604
            </a>
            <button
              onClick={() => open()}
              className="px-5 py-2.5 bg-[#0F3D8F] hover:bg-[#2E7AF9] text-white text-sm font-semibold rounded-md transition-colors"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled || !isHome
                ? "text-[#0D1B2A] hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-[#BFC5CC]/40 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block px-4 py-3 text-sm font-medium rounded-md cursor-pointer ${
                      location === link.href
                        ? "text-[#0F3D8F] bg-[#0F3D8F]/8"
                        : "text-[#0D1B2A] hover:text-[#0F3D8F] hover:bg-[#0F3D8F]/5"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-3 border-t border-[#BFC5CC]/40">
                <a
                  href="tel:+919354900604"
                  className="block px-4 py-2 text-sm text-[#0F3D8F] font-medium"
                >
                  +91 93549 00604
                </a>
                <button
                  onClick={() => open()}
                  className="w-full mt-2 px-5 py-3 bg-[#0F3D8F] text-white text-sm font-semibold rounded-md"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
