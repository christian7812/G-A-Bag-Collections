import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-12 pb-8 border-t border-gray-800">

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="G&A Collection"
                className="w-12 h-12 rounded-xl object-cover border border-gray-700 shadow-sm"
              />
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white uppercase block">
                  G&A <span className="text-gray-900">COLLECTION</span>
                </span>
                <span className="text-[10px] tracking-wider text-gray-400 font-semibold uppercase">
                  Ghana's Favorite Women's Bags
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Discover beautiful, durable and trendy female handbags, shoulder bags, totes and gala clutches designed for Ghanaian ladies. Reliable doorstep delivery across Accra and nationwide.
            </p>


          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/shop?category=Handbags" className="hover:text-black transition">Handbags</Link></li>
              <li><Link to="/shop?category=Shoulder%20Bags" className="hover:text-black transition">Shoulder Bags</Link></li>
              <li><Link to="/shop?category=Tote%20Bags" className="hover:text-black transition">Tote Bags</Link></li>
              <li><Link to="/shop?category=Crossbody%20Bags" className="hover:text-black transition">Crossbody Bags</Link></li>
              <li><Link to="/shop?category=Clutches" className="hover:text-black transition">Clutches & Evening Bags</Link></li>
              <li><Link to="/shop?sort=new" className="text-gray-900 font-semibold hover:underline">New Arrivals ✨</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/contact" className="hover:text-black transition">Help Center & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-black transition">Delivery Timelines & Rates</Link></li>
              <li><Link to="/contact" className="hover:text-black transition">How to Pay with USSD & MoMo</Link></li>
              <li><Link to="/contact" className="hover:text-black transition">14-Day Return Policy</Link></li>
              <li><Link to="/contact" className="hover:text-black transition">Contact Customer Support</Link></li>
            </ul>
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
