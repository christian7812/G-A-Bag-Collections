import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, Shield, Truck, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-12 pb-8 border-t border-gray-800">
      
      {/* 1. Jumia-Style Top Newsletter Subscribe Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-gray-800">
        <div className="bg-[#2A2A2A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-700/60">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest">
              NEW TO G&A COLLECTION?
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Subscribe to our newsletter for exclusive bag discounts & restock alerts!
            </h3>
            <p className="text-xs text-gray-400">
              Get GH₵ 50 off your first bag purchase when you join our VIP shopping list.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="px-5 py-3 bg-pink-900/60 border border-brand-pink text-pink-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-pink" />
                <span>You're subscribed! Check your email for your voucher.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full sm:w-72 bg-[#1A1A1A] border-2 border-gray-700 focus:border-brand-pink rounded-l-xl px-4 py-3 text-xs text-white placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold uppercase rounded-r-xl transition shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links Columns (Jumia Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="G&A Collection"
                className="w-12 h-12 rounded-xl object-cover border border-pink-400 shadow-sm"
              />
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white uppercase block">
                  G&A <span className="text-brand-pink">COLLECTION</span>
                </span>
                <span className="text-[10px] tracking-wider text-pink-300 font-semibold uppercase">
                  Ghana's Favorite Women's Bags
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Discover beautiful, durable and trendy female handbags, shoulder bags, totes and gala clutches designed for Ghanaian ladies. Reliable doorstep delivery across Accra and nationwide.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-brand-pink text-white flex items-center justify-center transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-brand-pink text-white flex items-center justify-center transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/shop?category=Handbags" className="hover:text-brand-pink transition">Handbags</Link></li>
              <li><Link to="/shop?category=Shoulder%20Bags" className="hover:text-brand-pink transition">Shoulder Bags</Link></li>
              <li><Link to="/shop?category=Tote%20Bags" className="hover:text-brand-pink transition">Tote Bags</Link></li>
              <li><Link to="/shop?category=Crossbody%20Bags" className="hover:text-brand-pink transition">Crossbody Bags</Link></li>
              <li><Link to="/shop?category=Clutches" className="hover:text-brand-pink transition">Clutches & Evening Bags</Link></li>
              <li><Link to="/shop?sort=new" className="text-brand-pink font-semibold hover:underline">New Arrivals ✨</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/contact" className="hover:text-brand-pink transition">Help Center & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition">Delivery Timelines & Rates</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition">How to Pay with USSD & MoMo</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition">14-Day Return Policy</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition">Contact Customer Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Contact Accra Store</h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                <span>Spintex & Airport Residential, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                <span className="font-semibold text-white">+233 24 412 3456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                <span>support@gacollection.com</span>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-brand-pink/20 text-pink-300 text-[10px] font-bold px-2 py-1 rounded">
                  🕒 Mon - Sat: 8:00 AM - 8:00 PM
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar: Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} G&A Collection Ghana. All rights reserved.
        </p>
      </div>

    </footer>
  );
};
