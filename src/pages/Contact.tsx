import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useSubmitContact, useSubmitCallback } from "@/lib/api-client";
import { useQuoteModal } from "@/components/modals/QuoteModalProvider";
import { useSEO, BASE_URL } from "@/hooks/useSEO";

export default function Contact() {
  const { open } = useQuoteModal();

  useSEO({
    title: "Contact FABMACS INNOVATION | Get a Quote — Industrial Equipment Manufacturer Faridabad",
    description: "Contact FABMACS INNOVATION for a custom equipment quote. Call +91 9354900604 or email info@fabmacs.com. Visit us at Plot No. 18, 16/6 Mathura Road, Old Faridabad, Haryana 121002. Engineering team available Mon–Sat.",
    canonical: `${BASE_URL}/contact`,
    keywords: "contact FABMACS INNOVATION, industrial equipment quote Faridabad, conveyor manufacturer contact India, get quote material handling equipment",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact FABMACS INNOVATION",
      url: `${BASE_URL}/contact`,
      description: "Get in touch with FABMACS INNOVATION for industrial equipment quotes and enquiries.",
      mainEntity: {
        "@type": "Organization",
        name: "FABMACS INNOVATION",
        telephone: "+91-9354900604",
        email: "info@fabmacs.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 18, 16/6 Mathura Road",
          addressLocality: "Old Faridabad",
          addressRegion: "Haryana",
          postalCode: "121002",
          addressCountry: "IN"
        }
      }
    }
  });

  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", company: "", industry: "", message: "" });
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "", email: "", preferredTime: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  const contactMutation = useSubmitContact();
  const callbackMutation = useSubmitCallback();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(
      { data: { ...contactForm, phone: contactForm.phone || null, company: contactForm.company || null, industry: contactForm.industry || null } },
      { onSuccess: () => setContactSuccess(true) }
    );
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callbackMutation.mutate(
      { data: { ...callbackForm, email: callbackForm.email || null, preferredTime: callbackForm.preferredTime || null } },
      { onSuccess: () => setCallbackSuccess(true) }
    );
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="fabmacs-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#2E7AF9] text-xs font-bold uppercase tracking-widest mb-3">Contact Us</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">Let's Talk Engineering</h1>
            <p className="text-[#BFC5CC] text-lg">Have a project? A question? Need a quote? Our engineering team responds within 24 hours — usually much faster.</p>
          </div>
        </div>
      </section>

      {/* Contact details + forms */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info sidebar */}
            <div className="space-y-5">
              {/* Contact cards */}
              {[
                { icon: <Phone size={18} className="text-[#2E7AF9]" />, label: "Phone", value: "+91 9354900604", href: "tel:+919354900604" },
                { icon: <Mail size={18} className="text-[#2E7AF9]" />, label: "Email", value: "info@fabmacs.com", href: "mailto:info@fabmacs.com" },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 p-5 bg-white border border-[#BFC5CC]/40 rounded-2xl hover:border-[#0F3D8F]/30 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center group-hover:bg-[#0F3D8F] transition-colors">
                    <span className="group-hover:text-white transition-colors">{c.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-widest">{c.label}</div>
                    <div className="font-semibold text-[#0D1B2A] text-sm mt-0.5">{c.value}</div>
                  </div>
                </a>
              ))}

              <div className="p-5 bg-white border border-[#BFC5CC]/40 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-3">
                  <MapPin size={18} className="text-[#2E7AF9]" />
                </div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">Address</div>
                <div className="text-sm text-[#0D1B2A] leading-relaxed">Plot No. 18, 16/6 Mathura Road,<br />Old Faridabad, Haryana 121002, India</div>
              </div>

              <div className="p-5 bg-white border border-[#BFC5CC]/40 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center mb-3">
                  <Clock size={18} className="text-[#2E7AF9]" />
                </div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">Working Hours</div>
                <div className="text-sm text-[#0D1B2A]">Monday – Saturday<br />9:00 AM – 6:00 PM IST</div>
              </div>

              {/* WhatsApp shortcut */}
              <a
                href="https://wa.me/919354900604?text=Hello%2C%20I%20am%20interested%20in%20FABMACS%20equipment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:border-[#25D366]/60 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#0D1B2A] text-sm">Chat on WhatsApp</div>
                  <div className="text-xs text-gray-500">Quickest response</div>
                </div>
              </a>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact form */}
              <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-8">
                <h2 className="text-xl font-black text-[#0D1B2A] mb-1">Send a Message</h2>
                <p className="text-sm text-gray-500 mb-6">Describe your project and we'll get back to you within 24 hours.</p>

                {contactSuccess ? (
                  <div className="text-center py-10">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                    <h3 className="font-bold text-[#0D1B2A] mb-2">Message Received!</h3>
                    <p className="text-sm text-gray-500">Our team will reach out to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name *</label>
                        <input required value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
                        <input value={contactForm.phone} onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 ..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email *</label>
                        <input required type="email" value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Company</label>
                        <input value={contactForm.company} onChange={(e) => setContactForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Industry</label>
                      <select value={contactForm.industry} onChange={(e) => setContactForm(f => ({ ...f, industry: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]">
                        <option value="">Select your industry</option>
                        {["Food Processing","Pharmaceutical","Packaging","Chemical","Cosmetic","Nutraceutical","Dairy","Agriculture"].map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Message *</label>
                      <textarea required rows={4} value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your project, material, capacity, and any specific requirements..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F] resize-none" />
                    </div>
                    {contactMutation.isError && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                    <div className="flex gap-3">
                      <button type="submit" disabled={contactMutation.isPending} className="flex-1 py-3 bg-[#0F3D8F] hover:bg-[#2E7AF9] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                        {contactMutation.isPending ? <><Loader2 size={16} className="animate-spin" />Sending...</> : "Send Message"}
                      </button>
                      <button type="button" onClick={() => open()} className="px-6 py-3 border border-[#0F3D8F] text-[#0F3D8F] font-semibold rounded-lg hover:bg-[#0F3D8F] hover:text-white transition-colors text-sm">
                        Get Quote Instead
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Callback form */}
              <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#0F3D8F]/8 flex items-center justify-center">
                    <Phone size={18} className="text-[#2E7AF9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D1B2A]">Request a Callback</h3>
                    <p className="text-xs text-gray-500">Our engineers will call you at your preferred time</p>
                  </div>
                </div>
                {callbackSuccess ? (
                  <div className="text-center py-5">
                    <CheckCircle size={36} className="text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-[#0D1B2A]">Callback scheduled!</p>
                    <p className="text-xs text-gray-500">We'll call you at your preferred time.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Name *</label>
                      <input required value={callbackForm.name} onChange={(e) => setCallbackForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone *</label>
                      <input required value={callbackForm.phone} onChange={(e) => setCallbackForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 ..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email</label>
                      <input type="email" value={callbackForm.email} onChange={(e) => setCallbackForm(f => ({ ...f, email: e.target.value }))} placeholder="optional" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Preferred Time</label>
                      <select value={callbackForm.preferredTime} onChange={(e) => setCallbackForm(f => ({ ...f, preferredTime: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]">
                        <option value="">Any time</option>
                        <option value="9am-11am">9:00 AM – 11:00 AM</option>
                        <option value="11am-1pm">11:00 AM – 1:00 PM</option>
                        <option value="2pm-4pm">2:00 PM – 4:00 PM</option>
                        <option value="4pm-6pm">4:00 PM – 6:00 PM</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      {callbackMutation.isError && <p className="text-xs text-red-500 mb-2">Something went wrong. Please try again.</p>}
                      <button type="submit" disabled={callbackMutation.isPending} className="w-full py-2.5 bg-[#0D1B2A] hover:bg-[#0F3D8F] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                        {callbackMutation.isPending ? <><Loader2 size={14} className="animate-spin" />...</> : "Schedule Callback"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
