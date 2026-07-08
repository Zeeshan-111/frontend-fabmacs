import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, useCountUp } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle, Phone, Mail, Shield, Zap, Globe, Wrench, Star } from "lucide-react";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { PRODUCTS, INDUSTRIES, COMPANY_INFO } from "@/lib/data";
import { useSubmitContact } from "@/lib/api-client";
import BrochureModal from "@/components/modals/BrochureModal";
import { useSEO, BASE_URL } from "@/hooks/useSEO";

function StatCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-white tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[#BFC5CC] text-sm font-medium mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const testimonials = [
  {
    name: "Anil Sharma",
    role: "Plant Head",
    company: "Haldiram Snacks Pvt Ltd",
    industry: "Food Processing",
    text: "FABMACS delivered a complete conveyor and bucket elevator system for our new Nagpur plant. Installation was seamless, and 18 months in — zero downtime. Their after-sales support is exceptional.",
  },
  {
    name: "Dr. Priya Menon",
    role: "Head of Manufacturing",
    company: "Cipla API Division",
    industry: "Pharmaceutical",
    text: "We needed cGMP-compliant screw conveyors for API transfer. FABMACS understood the regulatory requirements without us having to explain twice. The SS 316L finish and documentation were spot on.",
  },
  {
    name: "Ramesh Gupta",
    role: "Director – Operations",
    company: "Agro Feeds Limited",
    industry: "Agriculture",
    text: "Bucket elevators handling 800 TPH of wheat — FABMACS engineered it right the first time. Delivery was on schedule, and the team was available on-site during commissioning. Highly recommend.",
  },
  {
    name: "Suresh Patel",
    role: "General Manager – Production",
    company: "Patanjali Ayurved Ltd",
    industry: "Nutraceutical",
    text: "We procured ribbon blenders and auger fillers from FABMACS for our Haridwar facility. The build quality is excellent and the team was highly professional throughout the project.",
  },
  {
    name: "Meera Krishnan",
    role: "VP – Engineering",
    company: "Britannia Industries",
    industry: "Food Processing",
    text: "FABMACS designed a custom modular belt conveyor line for our biscuit production facility. The system integrated perfectly with our existing machinery. Very satisfied with the outcome.",
  },
  {
    name: "Rajiv Bhatia",
    role: "Works Manager",
    company: "UPL Limited",
    industry: "Chemical",
    text: "Screw conveyors for chemical powder handling — FABMACS delivered corrosion-resistant units with exactly the right pitch and seal specification. No leakage issues whatsoever.",
  },
  {
    name: "Kavita Nair",
    role: "Head of Plant Operations",
    company: "Marico Industries",
    industry: "FMCG",
    text: "We needed a Z bucket elevator for our new edible oil seed processing unit. FABMACS visited our facility, designed a compact layout solution, and delivered on time. Very responsive team.",
  },
  {
    name: "Harinder Singh",
    role: "Director",
    company: "Punjab Grain Processors",
    industry: "Agriculture",
    text: "FABMACS supplied hoppers and inclined bucket elevators for our grain storage facility. The fabrication quality and food-grade finish were exactly as specified. Would order again.",
  },
  {
    name: "Vinod Malhotra",
    role: "Chief Engineer",
    company: "Dabur India Ltd",
    industry: "Pharmaceutical",
    text: "The toy conveyor system installed at our Baddi plant has improved our internal logistics considerably. FABMACS handled the layout planning, fabrication, and commissioning without any issues.",
  },
  {
    name: "Sanjay Rao",
    role: "Plant Manager",
    company: "Maruthi Spices Pvt Ltd",
    industry: "Food Processing",
    text: "We got belt conveyors and screw conveyors for our spice processing unit. FABMACS delivered food-grade stainless steel units with smooth finish and quick lead time. Excellent experience.",
  },
  {
    name: "Neha Agarwal",
    role: "Operations Head",
    company: "Color Cosmetics India",
    industry: "Cosmetic",
    text: "Our cosmetic powder filling line required precise auger fillers with very low fill weights. FABMACS engineered the system to spec and trained our operators thoroughly. Performance has been consistent.",
  },
  {
    name: "Prakash Joshi",
    role: "Senior Purchase Manager",
    company: "Amul Dairy",
    industry: "Dairy",
    text: "Platform structures and hoppers from FABMACS are built to last. The SS construction with hygienic finish was exactly what our dairy processing plant required. Great build quality.",
  },
  {
    name: "Deepak Verma",
    role: "Factory Manager",
    company: "Ruchi Soya Industries",
    industry: "Food Processing",
    text: "FABMACS provided a full material handling solution — conveyors, elevators, and platforms — for our soybean processing expansion. The coordination from design to commissioning was very smooth.",
  },
];

const faqs = [
  {
    q: "What materials can your conveyors handle?",
    a: "Our conveyors are engineered for a broad range of materials including grains, powders, granules, tablets, chemicals, and liquids. We offer mild steel, SS 304, and SS 316L construction depending on your material compatibility requirements."
  },
  {
    q: "Do you offer custom engineering solutions?",
    a: "Yes. Every FABMACS system begins with a site-specific engineering study. We design, fabricate, and install bespoke solutions tailored to your plant layout, material properties, capacity requirements, and safety standards."
  },
  {
    q: "What is the typical lead time for delivery?",
    a: "Lead times vary by equipment complexity, typically 2–3 weeks. We confirm exact timelines once drawings are approved and provide a firm delivery schedule with each quotation."
  },
  {
    q: "Do you provide installation and commissioning support?",
    a: "Yes, our factory-trained engineers provide on-site installation supervision, equipment commissioning, operator training, and a post-commissioning inspection visit included with every project."
  },
  {
    q: "Which industries do you serve?",
    a: "We serve Food Processing, Pharmaceutical, Chemical, Nutraceutical, Cosmetic, Dairy, Agriculture, and Packaging industries across India. Our equipment meets relevant industry standards including FSSAI, cGMP, and IS specifications."
  },
  {
    q: "Can I request a site visit before finalizing an order?",
    a: "Yes, our engineering team can visit your facility to assess layout and material handling requirements before finalizing a proposal. Site visits help us ensure the solution is accurate and installation-ready."
  },
];

const whyChoose = [
  {
    icon: <Shield size={22} className="text-[#2E7AF9]" />,
    title: "Precision Engineering",
    desc: "Every component is designed to ISO standards with strict dimensional tolerances and material certifications."
  },
  {
    icon: <Zap size={22} className="text-[#2E7AF9]" />,
    title: "Custom Solutions",
    desc: "No off-the-shelf compromises. We engineer each system around your specific process, plant layout, and material."
  },
  {
    icon: <Globe size={22} className="text-[#2E7AF9]" />,
    title: "Pan-India Delivery",
    desc: "Supplied to 20+ states across India. Our logistics network ensures safe, on-time delivery and commissioning."
  },
  {
    icon: <Wrench size={22} className="text-[#2E7AF9]" />,
    title: "After-Sales Support",
    desc: "Dedicated service team for commissioning, operator training, spares supply, and annual maintenance contracts."
  },
];

const processSteps = [
  { step: "01", title: "Enquiry & Consultation", desc: "Share your requirements. Our engineers analyze your process and propose the optimal solution." },
  { step: "02", title: "Engineering Design", desc: "Detailed engineering drawings, load calculations, and material selection — all reviewed with you." },
  { step: "03", title: "Fabrication", desc: "Precision fabrication in our Faridabad facility using certified raw materials and quality-controlled processes." },
  { step: "04", title: "Quality Inspection", desc: "Rigorous pre-dispatch inspection including dimensional checks, weld quality, and trial run." },
  { step: "05", title: "Delivery & Installation", desc: "Safe delivery to your site followed by professional installation and commissioning by our engineers." },
];

export default function Home() {
  const { open } = useQuoteModal();
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const contactMutation = useSubmitContact();

  useSEO({
    title: "FABMACS INNOVATION | Industrial Equipment Manufacturer in Faridabad, India",
    description: "FABMACS INNOVATION — Leading conveyor, bucket elevator, ribbon blender & auger filler manufacturer in Faridabad, Haryana. Custom industrial equipment for food, pharma, chemical & packaging industries across India. 500+ installations. 15+ years.",
    canonical: `${BASE_URL}/`,
    keywords: "conveyor manufacturer Faridabad, bucket elevator manufacturer Haryana, industrial equipment manufacturer Faridabad, FABMACS INNOVATION, material handling equipment India, ribbon blender manufacturer, auger filler manufacturer Faridabad",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }]
      }
    ]
  });

  const featuredProducts = PRODUCTS.slice(0, 6);
  const featuredIndustries = INDUSTRIES.slice(0, 4);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(
      { data: { ...contactForm, phone: contactForm.phone || null, company: contactForm.company || null, industry: null } },
      { onSuccess: () => setContactSuccess(true) }
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center fabmacs-gradient overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D1B2A]/60" />

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-[#2E7AF9]/10" />
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border border-[#2E7AF9]/15" />
        <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] rounded-full bg-[#2E7AF9]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2E7AF9]/15 border border-[#2E7AF9]/30 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7AF9]" />
              <span className="text-[#BFC5CC] text-xs font-medium tracking-wide uppercase">Industrial Equipment Manufacturer · Faridabad, India</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
            >
              Engineering <br />
              <span className="text-gradient">Precision</span> Into<br />
              Every Process
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#BFC5CC] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Custom-engineered conveying, mixing, filling, and packaging equipment for India's most demanding industrial plants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => open()}
                className="px-8 py-4 bg-[#2E7AF9] hover:bg-white hover:text-[#0F3D8F] text-white font-bold rounded-xl transition-all text-base group flex items-center gap-2 justify-center"
              >
                Get a Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setBrochureOpen(true)}
                className="px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold rounded-xl transition-all text-base"
              >
                Download Brochure
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#BFC5CC] text-xs uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={18} className="text-[#BFC5CC]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0D1B2A] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <StatCounter end={500} suffix="+" label="Installations" />
            <StatCounter end={15} suffix="+" label="Years Experience" />
            <StatCounter end={9} label="Product Lines" />
            <StatCounter end={8} label="Industries Served" />
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">Industries We Serve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B2A] mb-4">Built for India's Most Demanding Plants</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From cleanroom pharmaceutical lines to high-volume grain silos — FABMACS equipment performs where others compromise.</p>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <RevealSection key={ind.id} delay={i * 0.06}>
                <Link href={`/industries/${ind.slug}`}>
                  <div className="group bg-white border border-[#BFC5CC]/40 rounded-2xl p-6 cursor-pointer card-hover">
                    <div className="w-10 h-10 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-4 group-hover:bg-[#0F3D8F] transition-colors">
                      <span className="text-[#0F3D8F] group-hover:text-white text-lg font-black transition-colors">
                        {ind.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0D1B2A] text-sm mb-1 group-hover:text-[#0F3D8F] transition-colors">{ind.name}</h3>
                    <p className="text-xs text-gray-400 leading-snug line-clamp-2">{ind.description.split(".")[0]}.</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">Our Equipment</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B2A]">Engineered for Performance</h2>
            </div>
            <Link href="/products">
              <span className="inline-flex items-center gap-2 text-[#0F3D8F] font-semibold text-sm hover:text-[#2E7AF9] transition-colors cursor-pointer group">
                View all 10 products
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <RevealSection key={product.id} delay={i * 0.08}>
                <Link href={`/products/${product.slug}`}>
                  <div className="group border border-[#BFC5CC]/40 rounded-2xl overflow-hidden cursor-pointer card-hover bg-white">
                    <div className="bg-[#F5F7FA] h-48 flex items-center justify-center relative overflow-hidden">
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
                        <div className="w-16 h-16 rounded-2xl bg-[#0F3D8F]/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0F3D8F] transition-colors">
                          <span className="text-2xl font-black text-[#0F3D8F] group-hover:text-white transition-colors">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#0D1B2A] mb-1 group-hover:text-[#0F3D8F] transition-colors">{product.name}</h3>
                      <p className="text-sm text-gray-500 leading-snug mb-4 line-clamp-2">{product.shortDescription}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.features.slice(0, 2).map((f) => (
                          <span key={f} className="px-2 py-0.5 bg-[#F5F7FA] text-[#0F3D8F] text-xs font-medium rounded-full">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE FABMACS ── */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-14">
            <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">Why FABMACS</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B2A] mb-4">Built Different. By Design.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">15 years of engineering discipline, customer-first execution, and an uncompromising standard of quality.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-7">
                  <div className="w-11 h-11 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#0D1B2A] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUFACTURING PROCESS ── */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-14">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">From Enquiry to Commissioning</h2>
            <p className="text-[#BFC5CC] max-w-xl mx-auto">A disciplined 5-step process that delivers every project on time, within spec, and without surprises.</p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="relative">
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#2E7AF9]/40 to-transparent z-10" />
                  )}
                  <div className="text-[#2E7AF9]/30 text-5xl font-black leading-none mb-4">{step.step}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-[#BFC5CC] text-xs leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">Client Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B2A]">Trusted by Industry Leaders</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="bg-[#F5F7FA] border border-[#BFC5CC]/40 rounded-2xl p-7 h-full">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={14} className="text-[#2E7AF9] fill-[#2E7AF9]" />
                    ))}
                  </div>
                  <blockquote className="text-[#0D1B2A] text-sm leading-relaxed mb-6">"{t.text}"</blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F3D8F] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#0D1B2A] text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <p className="text-[#0F3D8F] text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D1B2A]">Common Questions</h2>
          </RevealSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 0.05}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-[#0D1B2A] text-sm">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <span className="text-[#0F3D8F] text-xl font-light">+</span>
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-20 fabmacs-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <RevealSection>
              <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-4">Get In Touch</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Let's Build Your Next Line Together</h2>
              <p className="text-[#BFC5CC] mb-8">Have a project in mind? Send us your requirements and our engineers will come back with a detailed technical proposal — usually within 24 hours.</p>

              <div className="space-y-4">
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3 text-white group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#2E7AF9] transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="font-medium">{COMPANY_INFO.phone}</span>
                </a>
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-3 text-white group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#2E7AF9] transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="font-medium">{COMPANY_INFO.email}</span>
                </a>
              </div>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="bg-white rounded-2xl p-7 shadow-2xl">
                {contactSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#0D1B2A] mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Name *</label>
                        <input required value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
                        <input value={contactForm.phone} onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 ..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email *</label>
                      <input required type="email" value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Message *</label>
                      <textarea required rows={3} value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your requirements..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F] resize-none" />
                    </div>
                    {contactMutation.isError && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={contactMutation.isPending} className="w-full py-3 bg-[#0F3D8F] hover:bg-[#2E7AF9] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </div>
  );
}
