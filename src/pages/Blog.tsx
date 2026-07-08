import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
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

const posts = [
  {
    id: 1,
    title: "How to Select the Right Conveyor System for Your Food Processing Plant",
    excerpt: "Choosing between belt, modular, or screw conveyors for food applications involves more than capacity calculations. Learn the key selection criteria covering hygiene, material properties, and cleaning protocols.",
    category: "Technical Guide",
    date: "June 15, 2026",
    readTime: "8 min read",
    tag: "Conveying Systems",
  },
  {
    id: 2,
    title: "cGMP-Compliant Material Handling: What Pharmaceutical Manufacturers Must Know",
    excerpt: "Material handling equipment in pharmaceutical environments is subject to strict cGMP scrutiny. This guide covers surface finish requirements, documentation, change control, and validation protocols for pharmaceutical conveyors and blenders.",
    category: "Industry Insight",
    date: "May 28, 2026",
    readTime: "11 min read",
    tag: "Pharmaceutical",
  },
  {
    id: 3,
    title: "Ribbon Blender vs. Paddle Blender: Which Is Right for Your Application?",
    excerpt: "Ribbon blenders and paddle blenders both handle dry powder mixing, but their design differences make each better suited for specific materials and batch sizes. A detailed comparison for nutraceutical and chemical processors.",
    category: "Technical Guide",
    date: "May 10, 2026",
    readTime: "7 min read",
    tag: "Mixing Systems",
  },
  {
    id: 4,
    title: "Reducing Downtime in Bucket Elevator Systems: A Maintenance Checklist",
    excerpt: "Bucket elevators are critical path equipment — when they stop, production stops. This maintenance guide covers belt tension checks, boot inspection, bearing lubrication intervals, and the five most common failure modes and how to prevent them.",
    category: "Maintenance",
    date: "April 22, 2026",
    readTime: "6 min read",
    tag: "Conveying Systems",
  },
  {
    id: 5,
    title: "Auger Filler Accuracy: Why ±1% Fill Accuracy Matters and How to Achieve It",
    excerpt: "In protein powder filling and pharmaceutical dry syrups, fill accuracy directly impacts profitability and compliance. Learn the engineering factors behind auger filler accuracy: flight pitch, auger speed, product characteristics, and weight feedback systems.",
    category: "Technical Guide",
    date: "April 5, 2026",
    readTime: "9 min read",
    tag: "Filling Systems",
  },
  {
    id: 6,
    title: "Material Handling for Agri Commodities: Engineering for Scale",
    excerpt: "Agriculture processing plants demand high-capacity, heavy-duty equipment that performs in dusty, outdoor environments without constant maintenance. This guide examines belt conveyor, screw conveyor, and bucket elevator selection for grain, fertilizer, and seed handling.",
    category: "Industry Insight",
    date: "March 18, 2026",
    readTime: "10 min read",
    tag: "Agriculture",
  },
];

const categories = ["All", "Technical Guide", "Industry Insight", "Maintenance"];

export default function Blog() {
  const { open } = useQuoteModal();

  useSEO({
    title: "Industrial Equipment Blog | Conveyor & Material Handling Insights — FABMACS INNOVATION",
    description: "Expert insights on conveyor selection, material handling best practices, cGMP compliance, bucket elevator maintenance, and industrial equipment trends. From FABMACS INNOVATION engineers in Faridabad.",
    canonical: `${BASE_URL}/blog`,
    keywords: "industrial equipment blog India, conveyor selection guide, material handling tips, bucket elevator maintenance, food processing equipment articles, FABMACS INNOVATION blog"
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Engineering Blog</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Technical Insights for Industrial Professionals</h1>
            <p className="text-[#BFC5CC] text-lg">In-depth guides on conveying, mixing, filling, and material handling — written by FABMACS engineers for plant managers and procurement teams.</p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12 bg-white border-b border-[#BFC5CC]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-[#F5F7FA] border border-[#BFC5CC]/40 rounded-3xl overflow-hidden p-8">
              <div className="lg:w-1/2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F3D8F] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-2xl lg:text-3xl font-black text-[#0D1B2A] mb-3">{posts[0].title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                  <span className="flex items-center gap-1"><Calendar size={12} />{posts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{posts[0].readTime}</span>
                  <span className="flex items-center gap-1"><Tag size={12} />{posts[0].tag}</span>
                </div>
                <button className="px-5 py-2.5 bg-[#0F3D8F] hover:bg-[#2E7AF9] text-white font-semibold rounded-xl transition-colors text-sm flex items-center gap-2">
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
              <div className="lg:w-1/2 h-48 lg:h-64 bg-[#0F3D8F]/8 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#0F3D8F]/15 flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-black text-[#0F3D8F]">C</span>
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{posts[0].tag}</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* All posts */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <RevealSection key={post.id} delay={i * 0.07}>
                <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl overflow-hidden card-hover flex flex-col h-full">
                  <div className="bg-[#F5F7FA] h-40 flex items-center justify-center border-b border-[#BFC5CC]/30">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-[#0F3D8F]/8 flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-black text-[#0F3D8F]">{post.title.charAt(0)}</span>
                      </div>
                      <span className="text-xs text-gray-400 uppercase tracking-widest">{post.tag}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-widest ${
                        post.category === "Technical Guide"
                          ? "bg-[#0F3D8F]/8 text-[#0F3D8F]"
                          : post.category === "Maintenance"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0D1B2A] mb-2 text-base leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <button className="text-[#0F3D8F] hover:text-[#2E7AF9] transition-colors">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-14 fabmacs-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">Have a Technical Question?</h2>
          <p className="text-[#BFC5CC] mb-8">Our engineers publish articles and answer technical queries. Reach out with your specific process challenge.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => open()} className="px-8 py-3.5 bg-white text-[#0F3D8F] font-bold rounded-xl hover:bg-[#F5F7FA] transition-colors">
              Request Engineering Consultation
            </button>
            <a href="mailto:info@fabmacs.com" className="px-8 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:border-white/70 transition-colors">
              Email Our Engineers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
