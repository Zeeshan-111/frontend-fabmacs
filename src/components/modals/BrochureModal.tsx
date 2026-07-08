import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, FileText } from "lucide-react";
import { useSubmitBrochure } from "@/lib/api-client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [success, setSuccess] = useState(false);
  const mutation = useSubmitBrochure();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { ...form, phone: form.phone || null, company: form.company || null } },
      { onSuccess: () => setSuccess(true) }
    );
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", phone: "", company: "" });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">
              <div className="fabmacs-gradient px-6 py-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Download Brochure</h2>
                    <p className="text-[#BFC5CC] text-sm">Full product catalogue PDF</p>
                  </div>
                </div>
                <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                {success ? (
                  <div className="text-center py-6">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#0D1B2A] mb-2">Brochure on its way!</h3>
                    <p className="text-sm text-gray-500 mb-5">Check your inbox — we've sent the product catalogue to your email.</p>
                    <button onClick={handleClose} className="px-6 py-2.5 bg-[#0F3D8F] text-white rounded-lg text-sm font-medium">Close</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4">Enter your details to receive the FABMACS product catalogue instantly in your inbox.</p>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email *</label>
                      <input name="email" required type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Company</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D8F]/30 focus:border-[#0F3D8F]" />
                      </div>
                    </div>
                    {mutation.isError && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={mutation.isPending} className="w-full py-3 bg-[#0F3D8F] hover:bg-[#2E7AF9] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      {mutation.isPending ? <><Loader2 size={16} className="animate-spin" />Sending...</> : "Download Brochure"}
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
