import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Palette,
  Send,
  Layers,
  Award,
} from 'lucide-react';
import { TeamwearInquiry } from '../types';

export const TeamwearPage: React.FC = () => {
  const [form, setForm] = useState<TeamwearInquiry>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    sport: 'Cricket',
    estimatedQuantity: '25-50 Kits',
    customizationRequirements: 'Full sublimation jersey + shorts with custom team crest and player names.',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate front-end API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-12 sm:py-20 bg-vats-black min-h-screen text-vats-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vats-lime/10 border border-vats-lime/30 text-vats-lime text-xs font-mono font-bold uppercase tracking-widest rounded-sm">
            <Users className="w-3.5 h-3.5" />
            <span>BESPOKE UNIFORM SOLUTIONS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl text-vats-offwhite tracking-tight leading-none uppercase">
            Custom Teamwear & Academy Kits
          </h1>

          <p className="text-sm sm:text-base text-vats-muted leading-relaxed font-light">
            Equip your school, university, corporate team, or sports club with professional match-ready kits engineered for championship performance.
          </p>
        </div>

        {/* 3 Pillars of VATS Teamwear */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-sm bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl tracking-wider text-vats-offwhite">
              ENDLESS DESIGN FLEXIBILITY
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              Full 360° digital dye-sublimation printing. Unlimited colors, crisp gradients, sharp sponsor logos, and individualized player numbers that never crack or peel.
            </p>
          </div>

          <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-sm bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl tracking-wider text-vats-offwhite">
              TECHNICAL LAB TEXTILES
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              Moisture-wicking interlock polyesters, anti-odor silver ion treatments, and breathable micro-mesh side ventilation panels engineered to keep athletes cool.
            </p>
          </div>

          <div className="p-6 bg-vats-surface border border-vats-border rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-sm bg-vats-charcoal border border-vats-border flex items-center justify-center text-vats-lime">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl tracking-wider text-vats-offwhite">
              RAPID TURNAROUND & VOLUME DISCOUNTS
            </h3>
            <p className="text-xs text-vats-muted leading-relaxed">
              Fast production timelines from digital mockups to final delivery with dedicated team coordinators assisting your roster orders.
            </p>
          </div>
        </div>

        {/* Interactive Quotation Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-vats-surface border border-vats-border p-6 sm:p-12 rounded-sm">
          {/* Left info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-vats-lime uppercase tracking-widest font-bold">
              REQUEST A CUSTOM PROPOSAL
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-vats-offwhite tracking-tight leading-none uppercase">
              Build Your Kit.
            </h2>
            <p className="text-xs text-vats-muted leading-relaxed">
              Fill out your team requirements below. Our bespoke kit design team will review your specifications, prepare 3D visual mockups, and provide detailed batch pricing within 24 hours.
            </p>

            <div className="space-y-3 border-t border-vats-border pt-6 text-xs text-vats-offwhite/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Minimum Order Quantity: 15 complete kits</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Free 3D digital design consultation & mockups</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-vats-lime flex-shrink-0" />
                <span>Custom woven or high-density silicone team badges</span>
              </div>
            </div>

            <div className="p-4 bg-vats-black border border-vats-border rounded-sm text-xs space-y-1">
              <span className="font-bold text-vats-offwhite block">Demo Mode Notice</span>
              <p className="text-vats-muted text-[11px]">
                This is a front-end demonstration form. Submissions will be simulated without sending actual emails.
              </p>
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 bg-vats-black border border-vats-lime/50 rounded-sm text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 bg-vats-lime/10 border border-vats-lime text-vats-lime rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-vats-offwhite tracking-wider">
                  ENQUIRY RECEIVED!
                </h3>
                <p className="text-xs text-vats-muted max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-vats-offwhite">{form.name}</strong>. Your custom team proposal request for{' '}
                  <strong className="text-vats-offwhite">{form.organization}</strong> ({form.sport}) has been logged in demo mode.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-vats-charcoal hover:bg-vats-border text-xs uppercase font-bold tracking-wider rounded-sm text-vats-offwhite transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamwear-name" className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="teamwear-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="teamwear-org" className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Organization / Club / School *
                    </label>
                    <input
                      id="teamwear-org"
                      type="text"
                      required
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Delhi Premier Academy"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamwear-email" className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Email Address *
                    </label>
                    <input
                      id="teamwear-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="coach@academy.com"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="teamwear-phone" className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="teamwear-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Primary Sport
                    </label>
                    <select
                      value={form.sport}
                      onChange={(e) => setForm({ ...form, sport: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm cursor-pointer"
                    >
                      <option value="Cricket">Cricket Matchwear</option>
                      <option value="Football">Football / Futsal</option>
                      <option value="Athletics">Track & Athletics</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Corporate">Corporate / Gym Staff</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                      Estimated Quantity
                    </label>
                    <select
                      value={form.estimatedQuantity}
                      onChange={(e) => setForm({ ...form, estimatedQuantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm cursor-pointer"
                    >
                      <option value="15-25 Kits">15 - 25 Kits</option>
                      <option value="25-50 Kits">25 - 50 Kits</option>
                      <option value="50-100 Kits">50 - 100 Kits</option>
                      <option value="100+ Kits">100+ Large Roster</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-vats-muted block mb-1">
                    Customization Details / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={form.customizationRequirements}
                    onChange={(e) => setForm({ ...form, customizationRequirements: e.target.value })}
                    placeholder="Describe color palette, sponsor logo requirements, delivery deadline, etc."
                    className="w-full px-3.5 py-2.5 bg-vats-black border border-vats-border text-xs text-vats-offwhite focus:border-vats-lime focus:outline-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-vats-lime hover:bg-vats-limeHover text-vats-black font-extrabold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-xl shadow-vats-lime/10"
                >
                  {isSubmitting ? (
                    'Transmitting Proposal...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Request Custom Team Proposal
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
