import { useRef } from "react";
import { Link, useParams } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { PRODUCTS, INDUSTRIES } from "@/lib/data";
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

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useQuoteModal();
  const product = PRODUCTS.find((p) => p.slug === slug);

  useSEO({
    title: product ? `${product.name} | Industrial Equipment Manufacturer Faridabad — FABMACS INNOVATION` : "Product | FABMACS INNOVATION",
    description: product ? `${product.name} — ${product.shortDescription} Custom engineered by FABMACS INNOVATION, Faridabad. MS/SS construction, on-site installation & commissioning. Get a quote today.` : "Industrial equipment by FABMACS INNOVATION, Faridabad.",
    canonical: product ? `${BASE_URL}/products/${product.slug}` : undefined,
    keywords: product ? `${product.name} manufacturer Faridabad, ${product.name} manufacturer India, industrial equipment Haryana, FABMACS INNOVATION ${product.name}` : undefined,
    schema: product ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `${BASE_URL}${product.image}`,
      url: `${BASE_URL}/products/${product.slug}`,
      brand: { "@type": "Brand", name: "FABMACS INNOVATION" },
      manufacturer: {
        "@type": "Organization",
        name: "FABMACS INNOVATION",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Faridabad",
          addressRegion: "Haryana",
          addressCountry: "IN"
        }
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR" },
        seller: { "@type": "Organization", name: "FABMACS INNOVATION" }
      },
      additionalProperty: Object.entries(product.specifications).map(([name, value]) => ({
        "@type": "PropertyValue",
        name,
        value
      }))
    } : undefined
  });

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">Product not found</h1>
          <Link href="/products"><span className="text-[#0F3D8F] font-medium cursor-pointer">Back to Products</span></Link>
        </div>
      </div>
    );
  }

  const relatedIndustries = INDUSTRIES.filter((ind) => ind.keyProducts.includes(product.id));
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="pt-16">
      {/* Breadcrumb + Header */}
      <section className="fabmacs-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#BFC5CC] text-sm mb-6">
            <Link href="/products"><span className="hover:text-white cursor-pointer transition-colors">Products</span></Link>
            <ChevronRight size={14} />
            <span className="text-[#BFC5CC]/60">{product.category}</span>
            <ChevronRight size={14} />
            <span className="text-white">{product.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#2E7AF9]/20 text-[#BFC5CC] text-xs font-semibold uppercase tracking-widest rounded-full mb-4">{product.category}</span>
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">{product.name}</h1>
              <p className="text-[#BFC5CC] text-lg leading-relaxed mb-8">{product.description}</p>
              <div className="flex gap-3">
                <button onClick={() => open(product.name)} className="px-6 py-3 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all flex items-center gap-2">
                  Get Quote <ArrowRight size={16} />
                </button>
                <Link href="/products">
                  <span className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-all cursor-pointer inline-flex items-center gap-2">
                    <ArrowLeft size={16} /> Back
                  </span>
                </Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center min-h-[320px]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 max-h-80"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div className="flex-col items-center justify-center text-center p-12" style={{ display: product.image ? "none" : "flex" }}>
                <div className="w-24 h-24 rounded-3xl bg-[#2E7AF9]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl font-black text-[#2E7AF9]">{product.name.charAt(0)}</span>
                </div>
                <span className="text-[#BFC5CC] text-sm uppercase tracking-widest">{product.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Specs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <RevealSection>
              <h2 className="text-xl font-black text-[#0D1B2A] mb-6 uppercase tracking-wide">Key Features</h2>
              <div className="space-y-3">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-4 bg-[#F5F7FA] rounded-xl border border-[#BFC5CC]/30">
                    <CheckCircle size={18} className="text-[#2E7AF9] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#0D1B2A] font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* Specifications */}
            <RevealSection delay={0.1}>
              <h2 className="text-xl font-black text-[#0D1B2A] mb-6 uppercase tracking-wide">Technical Specifications</h2>
              <div className="border border-[#BFC5CC]/40 rounded-xl overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex items-center justify-between px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]"}`}>
                    <span className="text-sm text-gray-500 font-medium">{key}</span>
                    <span className="text-sm font-bold text-[#0D1B2A]">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">* Specifications are standard. Custom configurations available on request.</p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <h2 className="text-2xl font-black text-[#0D1B2A] mb-2">Applications</h2>
            <p className="text-gray-500 mb-8">Common use cases for the {product.name} across different processing environments.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.applications.map((app) => (
                <div key={app} className="bg-white border border-[#BFC5CC]/40 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#0F3D8F] font-bold text-sm">{app.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-[#0D1B2A]">{app}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Industries Served */}
      {relatedIndustries.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <h2 className="text-2xl font-black text-[#0D1B2A] mb-8">Industries Served</h2>
              <div className="flex flex-wrap gap-4">
                {relatedIndustries.map((ind) => (
                  <Link key={ind.id} href={`/industries/${ind.slug}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0F3D8F]/30 text-[#0F3D8F] text-sm font-semibold rounded-xl hover:bg-[#0F3D8F] hover:text-white transition-colors cursor-pointer">
                      {ind.name} <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* Quote CTA */}
      <section className="py-16 bg-[#0D1B2A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">Ready to Specify a {product.name}?</h2>
          <p className="text-[#BFC5CC] mb-8">Share your capacity, material, and layout requirements. Our engineers will design the right configuration for your plant.</p>
          <button onClick={() => open(product.name)} className="px-10 py-4 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all text-base">
            Request Detailed Quote
          </button>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#0D1B2A] mb-8">More in {product.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}>
                  <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-6 card-hover cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-4 group-hover:bg-[#0F3D8F] transition-colors">
                      <span className="text-xl font-black text-[#0F3D8F] group-hover:text-white transition-colors">{p.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-[#0D1B2A] mb-1 group-hover:text-[#0F3D8F] transition-colors">{p.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{p.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
