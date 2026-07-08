import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

export default function Industries() {
  const { open } = useQuoteModal();

  useSEO({
    title: "Industries Served | Food, Pharma, Chemical, Packaging — FABMACS INNOVATION Faridabad",
    description: "FABMACS INNOVATION manufactures custom industrial equipment for food processing, pharmaceutical, chemical, packaging, dairy, nutraceutical, cosmetic, and agriculture industries across India. Based in Faridabad, Haryana.",
    canonical: `${BASE_URL}/industries`,
    keywords: "industrial equipment food processing, conveyor manufacturer pharma, material handling chemical industry, packaging equipment manufacturer Faridabad, dairy equipment India",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Industries Served by FABMACS INNOVATION",
      itemListElement: INDUSTRIES.map((ind, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: ind.name,
        url: `${BASE_URL}/industries/${ind.slug}`
      }))
    }
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Industries</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Built for 8 of India's Most Demanding Sectors</h1>
            <p className="text-[#BFC5CC] text-lg">FABMACS equipment is deployed across food, pharma, chemical, dairy, and agri plants across India — engineered to meet each sector's specific standards and demands.</p>
          </div>
        </div>
      </section>

      {/* Industries grid */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRIES.map((ind, i) => {
              const keyProducts = PRODUCTS.filter((p) => ind.keyProducts.includes(p.id));
              return (
                <RevealSection key={ind.id} delay={i * 0.07}>
                  <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl overflow-hidden group card-hover">
                    <div className="fabmacs-gradient h-32 flex items-center px-7 relative overflow-hidden">
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-3xl font-black text-white/30">{ind.name.charAt(0)}</span>
                      </div>
                      <div>
                        <span className="text-[#BFC5CC] text-xs uppercase tracking-widest">Industry</span>
                        <h3 className="text-xl font-black text-white">{ind.name}</h3>
                      </div>
                    </div>
                    <div className="p-7">
                      <p className="text-sm text-gray-500 leading-relaxed mb-5">{ind.description}</p>

                      <div className="mb-5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recommended Equipment</p>
                        <div className="flex flex-wrap gap-2">
                          {keyProducts.map((p) => (
                            <Link key={p.id} href={`/products/${p.slug}`}>
                              <span className="px-3 py-1 bg-[#F5F7FA] border border-[#BFC5CC]/40 text-[#0F3D8F] text-xs font-semibold rounded-lg hover:bg-[#0F3D8F] hover:text-white transition-colors cursor-pointer">
                                {p.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/industries/${ind.slug}`}>
                          <span className="px-5 py-2 border border-[#0F3D8F] text-[#0F3D8F] text-sm font-semibold rounded-lg hover:bg-[#0F3D8F] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5">
                            Learn More <ArrowRight size={14} />
                          </span>
                        </Link>
                        <button onClick={() => open()} className="px-5 py-2 bg-[#0F3D8F] text-white text-sm font-semibold rounded-lg hover:bg-[#2E7AF9] transition-colors">
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D1B2A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">Your industry, your requirements</h2>
          <p className="text-[#BFC5CC] mb-8">Don't see your sector listed? We engineer custom solutions for any industrial process. Contact our team to discuss your requirements.</p>
          <button onClick={() => open()} className="px-10 py-4 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all">
            Request Custom Solution
          </button>
        </div>
      </section>
    </div>
  );
}
