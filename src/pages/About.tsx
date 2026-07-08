import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail, Award, Users, Factory, Globe } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { useSEO, BASE_URL } from "@/hooks/useSEO";

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const milestones = [
  { year: "2009", title: "Founded", desc: "FABMACS established in Faridabad with a vision to build precision industrial equipment for Indian manufacturers." },
  { year: "2012", title: "Pharma Entry", desc: "First cGMP-compliant screw conveyor system delivered to a pharmaceutical manufacturer in Baddi, Himachal Pradesh." },
  { year: "2015", title: "Food Grade Range", desc: "Launched full SS 304/316L product range certified for food contact applications under FSSAI guidelines." },
  { year: "2018", title: "100th Installation", desc: "Celebrated delivery of our 100th complete material handling system — a bucket elevator for a grain silo in Punjab." },
  { year: "2022", title: "Expanded Facility", desc: "Expanded our Faridabad fabrication facility to 15,000 sq ft with dedicated CNC and quality inspection bays." },
  { year: "2024", title: "500+ Installations", desc: "Crossed 500 successful equipment installations across 8 industries in 20+ states across India." },
];

const capabilities = [
  { icon: <Factory size={20} className="text-[#2E7AF9]" />, title: "In-House Fabrication", desc: "15,000 sq ft facility with CNC plasma cutting, MIG/TIG welding, and electro-polishing" },
  { icon: <Award size={20} className="text-[#2E7AF9]" />, title: "Quality Assurance", desc: "Dimensional inspection, weld quality audit, and load testing before every dispatch" },
  { icon: <Users size={20} className="text-[#2E7AF9]" />, title: "Engineering Team", desc: "Mechanical engineers with domain expertise in conveying, mixing, and filling systems" },
  { icon: <Globe size={20} className="text-[#2E7AF9]" />, title: "Pan-India Reach", desc: "Delivered and commissioned in 20+ states — from Punjab to Tamil Nadu, Gujarat to Assam" },
];

export default function About() {
  const { open } = useQuoteModal();

  useSEO({
    title: "About FABMACS INNOVATION | Industrial Equipment Manufacturer Since 2009 — Faridabad",
    description: "Founded in 2009 in Faridabad, Haryana, FABMACS INNOVATION is a trusted manufacturer of conveyors, bucket elevators, blenders, and filling equipment. 500+ installations across 20+ Indian states. Engineering excellence backed by genuine after-sales commitment.",
    canonical: `${BASE_URL}/about`,
    keywords: "FABMACS INNOVATION about, industrial equipment manufacturer Faridabad since 2009, conveyor manufacturer Haryana history, material handling company India",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About FABMACS INNOVATION",
      url: `${BASE_URL}/about`,
      description: "FABMACS INNOVATION — 15+ years of industrial equipment manufacturing in Faridabad, Haryana.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` }
        ]
      }
    }
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">About FABMACS</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6">15 Years of Engineering Excellence. One Standard — Uncompromising.</h1>
            <p className="text-[#BFC5CC] text-lg leading-relaxed">FABMACS INNOVATION was founded in 2009 in Faridabad, Haryana with a single mission: build industrial equipment that performs flawlessly in India's most demanding production environments — and back it with genuine after-sales commitment.</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-3xl font-black text-[#0D1B2A] mb-5">Built from the Plant Floor Up</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>FABMACS was born from a simple observation: Indian manufacturers deserve industrial equipment that matches the best of what's available globally — engineered with precision, built to last, and supported with genuine commitment after the sale.</p>
                <p>Starting with basic belt conveyors for the food processing sector, we progressively expanded our engineering capabilities into pharmaceutical handling, mixing systems, precision filling, and complete structural solutions.</p>
                <p>Today, FABMACS equipment runs in Haldiram's plants, pharma facilities in Himachal Pradesh, grain silos in Punjab, and dairy processing units in Rajasthan. Every installation is a reference — a testament to the standard we hold ourselves to.</p>
                <p>We remain a focused, engineering-first company. We don't chase volume at the expense of quality. Every system we deliver is designed by our engineers, fabricated in our facility, and commissioned by our team.</p>
              </div>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "500+", label: "Equipment Installations" },
                  { number: "15+", label: "Years of Experience" },
                  { number: "20+", label: "States Covered" },
                  { number: "8", label: "Industries Served" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F5F7FA] border border-[#BFC5CC]/40 rounded-2xl p-7 text-center">
                    <div className="text-4xl font-black text-[#0F3D8F] mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">Manufacturing Capabilities</p>
            <h2 className="text-3xl font-black text-[#0D1B2A]">Built In-House. Controlled End to End.</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <RevealSection key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-7">
                  <div className="w-12 h-12 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-5">
                    {cap.icon}
                  </div>
                  <h3 className="font-bold text-[#0D1B2A] mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-14">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-3xl font-black text-white">15 Years of Milestones</h2>
          </RevealSection>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#0F3D8F]/40" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <RevealSection key={i} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#2E7AF9] -translate-x-1.5 mt-1.5 z-10" />
                    <div className={`pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <span className="text-[#2E7AF9] font-black text-xl">{m.year}</span>
                      <h3 className="font-bold text-white mt-0.5 mb-1">{m.title}</h3>
                      <p className="text-[#BFC5CC] text-sm leading-relaxed">{m.desc}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealSection>
              <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-4">Our Location</p>
              <h2 className="text-2xl font-black text-[#0D1B2A] mb-6">Faridabad, Haryana — NCR Manufacturing Hub</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#2E7AF9] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Plot No. 18, 16/6 Mathura Road, Old Faridabad, Haryana 121002, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#2E7AF9] flex-shrink-0" />
                  <a href="tel:+919354900604" className="text-gray-600 text-sm hover:text-[#0F3D8F] transition-colors">+91 9354900604</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#2E7AF9] flex-shrink-0" />
                  <a href="mailto:info@fabmacs.com" className="text-gray-600 text-sm hover:text-[#0F3D8F] transition-colors">info@fabmacs.com</a>
                </div>
              </div>
              <button onClick={() => open()} className="px-6 py-3 bg-[#0F3D8F] hover:bg-[#2E7AF9] text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                Get in Touch <ArrowRight size={16} />
              </button>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div className="bg-[#F5F7FA] rounded-2xl h-72 flex items-center justify-center border border-[#BFC5CC]/40">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F3D8F]/8 flex items-center justify-center mx-auto mb-4">
                    <MapPin size={24} className="text-[#0F3D8F]" />
                  </div>
                  <p className="font-bold text-[#0D1B2A] mb-1">FABMACS INNOVATION</p>
                  <p className="text-sm text-gray-500">Old Faridabad, Haryana</p>
                  <a
                    href="https://maps.google.com/?q=Old+Faridabad+Haryana+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[#0F3D8F] font-semibold hover:text-[#2E7AF9] transition-colors"
                  >
                    View on Google Maps <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
