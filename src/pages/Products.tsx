import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data";
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

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const { open } = useQuoteModal();

  useSEO({
    title: "Industrial Equipment Products | Conveyors, Elevators, Blenders — FABMACS INNOVATION",
    description: "Browse FABMACS INNOVATION's complete range of industrial equipment: belt conveyors, bucket elevators, screw conveyors, ribbon blenders, auger fillers, hoppers & platforms. Custom engineered for food, pharma & chemical industries. Manufacturer in Faridabad.",
    canonical: `${BASE_URL}/products`,
    keywords: "belt conveyor manufacturer Faridabad, bucket elevator manufacturer India, screw conveyor manufacturer Haryana, ribbon blender manufacturer, auger filler manufacturer, industrial conveyor Faridabad",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "FABMACS INNOVATION — Industrial Equipment Products",
      description: "Complete range of custom-engineered industrial equipment manufactured in Faridabad, India",
      url: `${BASE_URL}/products`,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${BASE_URL}/products/${p.slug}`,
        description: p.shortDescription
      }))
    }
  });

  const categories = ["All", ...PRODUCT_CATEGORIES];
  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Product Range</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Industrial Equipment Designed to Perform</h1>
            <p className="text-[#BFC5CC] text-lg">10 precision-engineered product lines covering conveyors, elevators, blenders, fillers, and structural solutions.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#BFC5CC]/40 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeCategory === cat
                      ? "bg-[#0F3D8F] text-white"
                      : "bg-[#F5F7FA] text-gray-600 hover:bg-[#0F3D8F]/8 hover:text-[#0F3D8F]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F] w-52"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <RevealSection key={product.id} delay={i * 0.06}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl overflow-hidden card-hover group h-full flex flex-col">
                  <div className="bg-[#F5F7FA] h-52 flex items-center justify-center border-b border-[#BFC5CC]/30 overflow-hidden relative">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div className="flex-col items-center justify-center w-full h-full absolute inset-0" style={{ display: product.image ? "none" : "flex" }}>
                      <div className="w-16 h-16 rounded-2xl bg-[#0F3D8F]/8 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#0F3D8F] transition-colors">
                        <span className="text-2xl font-black text-[#0F3D8F] group-hover:text-white transition-colors">{product.name.charAt(0)}</span>
                      </div>
                      <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0D1B2A] text-base mb-2 group-hover:text-[#0F3D8F] transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{product.shortDescription}</p>

                    {/* Specs preview */}
                    <div className="space-y-1.5 mb-5">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{key}</span>
                          <span className="font-medium text-[#0D1B2A]">{val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/products/${product.slug}`}>
                        <span className="flex-1 px-4 py-2 border border-[#0F3D8F] text-[#0F3D8F] text-sm font-semibold rounded-lg hover:bg-[#0F3D8F] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1">
                          Details <ArrowRight size={14} />
                        </span>
                      </Link>
                      <button
                        onClick={() => open(product.name)}
                        className="flex-1 px-4 py-2 bg-[#0F3D8F] text-white text-sm font-semibold rounded-lg hover:bg-[#2E7AF9] transition-colors"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium mb-2">No products found</p>
              <p className="text-sm">Try a different category or search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D1B2A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">Can't find what you need?</h2>
          <p className="text-[#BFC5CC] mb-8">We engineer custom solutions for unique process requirements. Talk to our team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => open()} className="px-8 py-3.5 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all">
              Request Custom Quote
            </button>
            <Link href="/contact">
              <span className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-all cursor-pointer inline-block">
                Contact Engineering Team
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
