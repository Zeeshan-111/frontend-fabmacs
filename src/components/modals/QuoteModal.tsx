import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useSubmitQuote } from "@/lib/api-client";
import { PRODUCTS } from "@/lib/data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultProduct = "" }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    product: defaultProduct,
    quantity: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const mutation = useSubmitQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { ...form, phone: form.phone || null, company: form.company || null, industry: form.industry || null, quantity: form.quantity || null, message: form.message || null } },
      {
        onSuccess: () => setSuccess(true),
      }
    );
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", phone: "", company: "", industry: "", product: defaultProduct, quantity: "", message: "" });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="fabmacs-gradient px-6 py-5 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Request a Quote</h2>
                  <p className="text-[#BFC5CC] text-sm mt-0.5">Our team will respond within 24 hours</p>
                </div>
                <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors mt-0.5">
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">Quote Request Received!</h3>
                    <p className="text-sm text-gray-500 mb-6">Our team will contact you within 24 hours with a detailed quotation.</p>
                    <button onClick={handleClose} className="px-6 py-2.5 bg-[#0F3D8F] text-white rounded-lg text-sm font-medium">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name *</label>
                        <input name="name" required value={form.name} onChange={handleChange} placeholder="Rajesh Kumar" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email *</label>
                      <input name="email" required type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Company</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Industry</label>
                        <select name="industry" value={form.industry} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]">
                          <option value="">Select...</option>
                          {["Food Processing","Pharmaceutical","Packaging","Chemical","Cosmetic","Nutraceutical","Dairy","Agriculture"].map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Product *</label>
                        <select name="product" required value={form.product} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]">
                          <option value="">Select product</option>
                          {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Quantity</label>
                        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 2 units" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Requirements</label>
                      <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Describe your specific requirements, material type, capacity needed..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F] resize-none" />
                    </div>
                    {mutation.isError && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full py-3 bg-[#0F3D8F] hover:bg-[#2E7AF9] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Quote Request"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
