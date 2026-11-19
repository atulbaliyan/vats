import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'Order & Shipping Status',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How long does standard delivery take across India?',
      a: 'All orders are dispatched from our central performance hub within 24 hours. Metros receive deliveries within 2 to 3 business days; other regions within 4 to 5 business days.',
    },
    {
      q: 'What is your return & size exchange policy?',
      a: 'We offer a 30-day risk-free return and exchange policy. Products must be unwashed with original tags and packaging intact.',
    },
    {
      q: 'How do I place a bulk customized teamwear order?',
      a: 'Visit our dedicated Teamwear section to submit your squad requirements. Minimum order quantity is 15 kits, which includes full sublimation design and custom numbers.',
    },
    {
      q: 'Are your fabrics tested for color bleeding and shrinkage?',
      a: 'Yes, all VATS technical polyesters and combed cottons undergo extensive lab pre-shrinking and color-fastness wash tests up to 100 cycles.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
            CUSTOMER SUPPORT & INQUIRIES
          </span>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-none uppercase">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-vats-muted leading-relaxed font-light">
            Have a question about your order, sizing, or custom teamwear? Our athlete support team is ready to assist.
          </p>
        </div>

        {/* Contact Grid: Support info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Support Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-6">
              <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs text-vats-muted">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-vats-charcoal rounded-sm text-vats-lime">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-vats-offwhite block">Customer Care Email</span>
                    <span>support@vatssports.in (Demo)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-vats-charcoal rounded-sm text-vats-lime">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-vats-offwhite block">Athlete Helpline</span>
                    <span>+91 1800-VATS-PRO (Toll Free Demo)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-vats-charcoal rounded-sm text-vats-lime">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-vats-offwhite block">Operational Hours</span>
                    <span>Monday — Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-vats-charcoal rounded-sm text-vats-lime">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-vats-offwhite block">Headquarters</span>
                    <span>VATS Sports Design & Performance Lab, Delhi NCR, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="p-4 bg-vats-charcoal/50 border border-vats-border rounded-sm text-[11px] text-vats-muted">
              <strong className="text-vats-offwhite block mb-0.5">Note:</strong>
              This is a demonstration contact interface. Messages will be stored in your browser session for review.
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-vats-surface border border-vats-border p-6 sm:p-8 rounded-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 bg-vats-lime/10 border border-vats-lime text-vats-lime rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-vats-offwhite tracking-wider">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-xs text-vats-muted max-w-sm mx-auto">
                  Thank you, <strong className="text-vats-offwhite">{form.name}</strong>. Your inquiry regarding "{form.subject}" has been registered in demo mode.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-vats-charcoal hover:bg-vats-border text-xs font-bold uppercase tracking-wider rounded-sm text-vats-offwhite transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-2xl tracking-wider text-vats-offwhite uppercase mb-4">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aman Verma"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="aman@example.com"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      placeholder="e.g. VATS-7842"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm cursor-pointer"
                    >
                      <option value="Order & Shipping Status">Order & Shipping Status</option>
                      <option value="Size & Fit Exchange">Size & Fit Exchange</option>
                      <option value="Bespoke Teamwear Inquiry">Bespoke Teamwear Inquiry</option>
                      <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-xl shadow-vats-lime/10"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="pt-12 border-t border-vats-border space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl text-vats-offwhite uppercase">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-vats-border bg-vats-surface rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-vats-offwhite flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-vats-lime transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-vats-muted border-t border-vats-border/40 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
