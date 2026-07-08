import { useRef } from "react";
import { Link, useParams } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { INDUSTRIES, PRODUCTS } from "@/lib/data";
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

const industryDetails: Record<string, { challenges: string[]; solutions: string[]; compliance: string[] }> = {
  "food-processing": {
    challenges: ["FSSAI hygiene compliance", "Allergen cross-contamination prevention", "High-throughput material flow", "Frequent washdown requirements"],
    solutions: ["SS 304/316L food-grade construction", "Modular belt systems with high drainage capacity", "Enclosed screw and bucket conveyors for dust control", "CIP-compatible surface finishes"],
    compliance: ["FSSAI", "IS 2763", "Food Contact Material Standards"],
  },
  "pharmaceutical": {
    challenges: ["cGMP compliance across all contact surfaces", "Contained transfer of active ingredients", "Accurate filling and dosing", "Complete audit trail requirements"],
    solutions: ["SS 316L polished surfaces with Ra ≤ 0.8μ", "Enclosed screw conveyors for API transfer", "Servo-driven auger fillers with ±1% accuracy", "PLC-controlled systems with data logging"],
    compliance: ["WHO cGMP", "US FDA 21 CFR", "SCHEDULE M"],
  },
  "chemical": {
    challenges: ["Corrosive and abrasive material handling", "Explosion-proof requirements in hazardous zones", "Heavy bulk densities", "Containment of toxic dusts"],
    solutions: ["Polyethylene / PP / FRP lined equipment", "ATEX-certified drives available", "Heavy-duty structural frames", "Fully enclosed dust-tight systems"],
    compliance: ["ATEX", "IS 5572", "PCB guidelines"],
  },
  "nutraceutical": {
    challenges: ["Gentle handling of sensitive ingredients", "Homogeneous blending without degradation", "Accurate fill weights", "Multi-product flexibility"],
    solutions: ["Low-RPM ribbon blenders for gentle mixing", "Servo auger fillers with quick changeover", "Stainless steel with electro-polished finish", "Modular, easy-clean design"],
    compliance: ["FSSAI", "GMP guidelines", "WHO standards"],
  },
  "dairy": {
    challenges: ["High sanitary standards for milk-contact surfaces", "Handling of hygroscopic powders", "Frequent production changeovers", "Temperature-sensitive materials"],
    solutions: ["SS 316L dairy-grade finish", "Enclosed airtight conveyors", "Quick-release couplings for rapid cleaning", "Heated screw conveyors for temperature control"],
    compliance: ["FSSAI", "PFA Act", "BIS Dairy Standards"],
  },
  "cosmetic": {
    challenges: ["No product contamination from metal particles", "Gentle handling of delicate powders", "Accurate, repeatable filling", "Easy colour changeover"],
    solutions: ["UHMWPE/PP material contact parts", "Low-energy ribbon blenders", "Servo-controlled auger fillers", "Tool-less disassembly for cleaning"],
    compliance: ["IS 6608", "GMP cosmetics"],
  },
  "packaging": {
    challenges: ["High-speed integration with downstream machinery", "Varied pack formats and sizes", "Reliable material feeding", "Minimum changeover time"],
    solutions: ["Variable speed belt conveyors with servo control", "Hoppers with vibrating feeders", "Pneumatic discharge auger fillers", "Modular conveyor sections for reconfiguration"],
    compliance: ["IS 1370", "BIS packaging standards"],
  },
  "agriculture": {
    challenges: ["High volume bulk material handling", "Abrasive grains and seeds", "Outdoor and semi-outdoor installations", "Minimal maintenance environments"],
    solutions: ["Heavy-duty mild steel with epoxy coating", "High-capacity bucket elevators up to 1000 TPH", "Inclined belt conveyors with steel cord belts", "Weatherproof sealed bearings and drives"],
    compliance: ["IS 11592", "ASAE standards"],
  },
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useQuoteModal();
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  useSEO({
    title: industry ? `${industry.name} Equipment Manufacturer Faridabad | FABMACS INNOVATION` : "Industry Solutions | FABMACS INNOVATION",
    description: industry ? `FABMACS INNOVATION supplies custom industrial equipment for the ${industry.name} sector. ${industry.description} Manufactured in Faridabad, Haryana. Get a quote today.` : "Industry-specific industrial equipment by FABMACS INNOVATION, Faridabad.",
    canonical: industry ? `${BASE_URL}/industries/${industry.slug}` : undefined,
    keywords: industry ? `${industry.name} equipment manufacturer India, ${industry.name} conveyor Faridabad, industrial equipment ${industry.name} sector, FABMACS INNOVATION` : undefined,
    schema: industry ? {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Industrial Equipment for ${industry.name}`,
      description: industry.description,
      provider: {
        "@type": "Organization",
        name: "FABMACS INNOVATION",
        address: { "@type": "PostalAddress", addressLocality: "Faridabad", addressRegion: "Haryana", addressCountry: "IN" }
      },
      areaServed: { "@type": "Country", name: "India" },
      url: `${BASE_URL}/industries/${industry.slug}`
    } : undefined
  });

  if (!industry) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Industry not found</h1>
          <Link href="/industries"><span className="text-[#0F3D8F] font-medium cursor-pointer">Back to Industries</span></Link>
        </div>
      </div>
    );
  }

  const keyProducts = PRODUCTS.filter((p) => industry.keyProducts.includes(p.id));
  const details = industryDetails[slug] || { challenges: [], solutions: [], compliance: [] };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#BFC5CC] text-sm mb-6">
            <Link href="/industries"><span className="hover:text-white cursor-pointer transition-colors">Industries</span></Link>
            <ChevronRight size={14} />
            <span className="text-white">{industry.name}</span>
          </div>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-[#2E7AF9]/20 text-[#BFC5CC] text-xs font-semibold uppercase tracking-widest rounded-full mb-4">Industry Focus</span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">{industry.name}</h1>
            <p className="text-[#BFC5CC] text-xl leading-relaxed mb-8">{industry.description}</p>
            <div className="flex gap-3">
              <button onClick={() => open()} className="px-6 py-3 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all flex items-center gap-2">
                Get a Quote <ArrowRight size={16} />
              </button>
              <Link href="/industries">
                <span className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-all cursor-pointer inline-flex items-center gap-2">
                  <ArrowLeft size={16} /> All Industries
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      {(details.challenges.length > 0 || details.solutions.length > 0) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <RevealSection>
                <h2 className="text-xl font-black text-[#0D1B2A] mb-6 uppercase tracking-wide">Industry Challenges</h2>
                <div className="space-y-3">
                  {details.challenges.map((c) => (
                    <div key={c} className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                      <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-500 text-xs font-bold">!</span>
                      </span>
                      <span className="text-sm text-[#0D1B2A]">{c}</span>
                    </div>
                  ))}
                </div>
              </RevealSection>
              <RevealSection delay={0.1}>
                <h2 className="text-xl font-black text-[#0D1B2A] mb-6 uppercase tracking-wide">FABMACS Solutions</h2>
                <div className="space-y-3">
                  {details.solutions.map((s) => (
                    <div key={s} className="flex items-start gap-3 p-4 bg-[#F5F7FA] border border-[#BFC5CC]/30 rounded-xl">
                      <CheckCircle size={18} className="text-[#2E7AF9] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#0D1B2A]">{s}</span>
                    </div>
                  ))}
                </div>
              </RevealSection>
            </div>

            {details.compliance.length > 0 && (
              <RevealSection delay={0.15} className="mt-10">
                <div className="p-5 bg-[#0F3D8F]/5 border border-[#0F3D8F]/20 rounded-2xl flex flex-wrap items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0F3D8F]">Compliance Standards:</span>
                  {details.compliance.map((c) => (
                    <span key={c} className="px-3 py-1 bg-[#0F3D8F] text-white text-xs font-semibold rounded-full">{c}</span>
                  ))}
                </div>
              </RevealSection>
            )}
          </div>
        </section>
      )}

      {/* Recommended Products */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="text-2xl font-black text-[#0D1B2A] mb-2">Recommended Equipment</h2>
            <p className="text-gray-500 mb-8">FABMACS products most commonly deployed in {industry.name} plants.</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyProducts.map((p, i) => (
              <RevealSection key={p.id} delay={i * 0.1}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl overflow-hidden card-hover group">
                  <div className="bg-[#F5F7FA] h-36 flex items-center justify-center border-b border-[#BFC5CC]/30">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F3D8F]/8 flex items-center justify-center group-hover:bg-[#0F3D8F] transition-colors">
                      <span className="text-2xl font-black text-[#0F3D8F] group-hover:text-white transition-colors">{p.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#0F3D8F] font-semibold uppercase tracking-widest">{p.category}</span>
                    <h3 className="font-bold text-[#0D1B2A] mt-1 mb-2 group-hover:text-[#0F3D8F] transition-colors">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.shortDescription}</p>
                    <div className="flex gap-2">
                      <Link href={`/products/${p.slug}`}>
                        <span className="px-4 py-2 border border-[#0F3D8F] text-[#0F3D8F] text-sm font-semibold rounded-lg hover:bg-[#0F3D8F] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1">
                          Details <ArrowRight size={13} />
                        </span>
                      </Link>
                      <button onClick={() => open(p.name)} className="px-4 py-2 bg-[#0F3D8F] text-white text-sm font-semibold rounded-lg hover:bg-[#2E7AF9] transition-colors">
                        Quote
                      </button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0D1B2A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-4">Equipping {industry.name} Plants Across India</h2>
          <p className="text-[#BFC5CC] mb-8">Tell us your plant requirements. Our engineers will configure the optimal material handling solution for your operation.</p>
          <button onClick={() => open()} className="px-10 py-4 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all">
            Request Engineering Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
