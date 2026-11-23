import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle2, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Inquiry about Handbag');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && (email || message)) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
          Client Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-charcoal">
          We’re Here for You
        </h1>
        <p className="text-sm text-brand-muted">
          Whether you need styling advice, order tracking, or bespoke consultation, our concierge team is at your disposal.
        </p>
      </div>

      {/* Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-brand-border/60 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
              G&A Collection Boutique & Showroom
            </h2>

            <div className="space-y-5 text-xs text-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-brand-pink shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Accra Boutique</h4>
                  <p className="text-gray-500 mt-0.5">Senchi Street, Airport Residential Area & Spintex, Accra, Ghana</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-brand-pink shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Direct Phone & WhatsApp</h4>
                  <p className="text-gray-500 mt-0.5">+233 (0) 24 412 3456</p>
                  <p className="text-[11px] text-brand-pink font-semibold mt-0.5">Available for instant WhatsApp inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-brand-pink shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Email Inquiries</h4>
                  <p className="text-gray-500 mt-0.5">support@gacollection.com</p>
                  <p className="text-[11px] text-gray-400">Orders & Deliveries: orders@gacollection.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-soft/40 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Concierge Hours</h4>
                  <p className="text-brand-muted mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM GMT</p>
                  <p className="text-[11px] text-brand-muted">Sunday: 12:00 PM – 5:00 PM GMT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Highlights */}
          <div className="bg-brand-bg-subtle p-6 rounded-3xl border border-brand-border/60 space-y-4 text-xs text-brand-charcoal">
            <h3 className="font-serif text-base font-bold text-brand-charcoal">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 divide-y divide-brand-border/40">
              <div className="pt-2 first:pt-0 space-y-1">
                <p className="font-bold text-brand-accent">How does Paystack USSD payment work?</p>
                <p className="text-brand-muted leading-relaxed">
                  During checkout, select your network (MTN, Telecel, AT, or Bank USSD). A prompt pops up on your phone, or you dial the generated code, enter your PIN, and your payment confirms automatically.
                </p>
              </div>
              <div className="pt-2 space-y-1">
                <p className="font-bold text-brand-accent">Do I need to sign up for an account?</p>
                <p className="text-brand-muted leading-relaxed">
                  No! We believe in frictionless luxury shopping. All clients enjoy immediate guest checkout with zero registration barriers.
                </p>
              </div>
              <div className="pt-2 space-y-1">
                <p className="font-bold text-brand-accent">What is your delivery timeframe?</p>
                <p className="text-brand-muted leading-relaxed">
                  Orders in Greater Accra are delivered within 24 hours. Nationwide deliveries to Kumasi, Takoradi, Cape Coast, etc. arrive within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border/60 shadow-soft space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
              Send Concierge a Message
            </h2>
            <p className="text-xs text-brand-muted">
              We respond to all client correspondence within 2 business hours.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been received by our concierge. We will respond shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-charcoal">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-charcoal">Email Address or Phone</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ama@gmail.com or 0244123456"
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-charcoal">Inquiry Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent cursor-pointer"
              >
                <option value="Inquiry about Handbag">Inquiry about Specific Handbag</option>
                <option value="USSD Payment Assistance">USSD / MoMo Payment Assistance</option>
                <option value="Order Tracking">Track My Existing Order</option>
                <option value="Bespoke Order">Bespoke Monogramming & Custom Leather</option>
                <option value="Corporate Gifting">Corporate Gifting & VIP Packages</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-charcoal">Your Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How may our concierge assist your luxury experience today?"
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-8 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white font-semibold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Dispatch Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
