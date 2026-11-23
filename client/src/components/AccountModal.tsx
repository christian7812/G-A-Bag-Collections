import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Package, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  Lock,
  ArrowRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { orders } = useProducts();
  const [lookupQuery, setLookupQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    const q = lookupQuery.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === q ||
        o.id.toLowerCase() === q ||
        o.customerPhone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    );

    setSearchResult(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Processing & Packing</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1"><Truck className="w-3 h-3" /> With Courier Rider</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-800">Received (Pending Verification)</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-pink to-brand-pink-dark px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              👜
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Customer Account</h3>
              <p className="text-[11px] text-pink-100">G&A Collection Ghana</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* 1. Track Order Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Package className="w-4 h-4 text-brand-pink" />
              <span>Track Your Bag Order</span>
            </div>
            <p className="text-xs text-gray-500">
              Enter your Order Number (e.g. <span className="font-mono text-gray-700">PA-2026-XXXXX</span>) or phone number to check your delivery status.
            </p>

            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => {
                    setLookupQuery(e.target.value);
                    setSearched(false);
                  }}
                  placeholder="Order # or Mobile Phone"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 focus:border-brand-pink rounded-xl outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold rounded-xl transition shrink-0"
              >
                Track
              </button>
            </form>

            {/* Order Lookup Results */}
            {searched && (
              <div className="mt-3">
                {searchResult ? (
                  <div className="bg-pink-50/50 border border-pink-200 rounded-xl p-4 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-pink-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Order Number</span>
                        <span className="font-mono font-bold text-sm text-gray-900">{searchResult.orderNumber}</span>
                      </div>
                      {getStatusBadge(searchResult.orderStatus)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Customer</span>
                        <span className="font-semibold text-gray-800">{searchResult.customerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Delivery Region</span>
                        <span className="font-semibold text-gray-800">{searchResult.deliveryCity}, {searchResult.deliveryRegion}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Payment Method</span>
                        <span className="font-semibold text-gray-800">{searchResult.paymentMethod || 'Paystack USSD/MoMo'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Total Amount</span>
                        <span className="font-bold text-brand-pink">GH₵ {searchResult.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Items Purchased */}
                    <div className="pt-2 border-t border-pink-100">
                      <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5">Bags in Order</span>
                      <div className="space-y-1.5">
                        {searchResult.items?.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between text-xs">
                            <span className="text-gray-700 truncate max-w-[200px]">{item.productName} ({item.color?.name || 'Standard'}) x {item.quantity}</span>
                            <span className="font-semibold text-gray-900">GH₵ {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-xs text-gray-500">
                    <AlertCircle className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    No orders found for "{lookupQuery}". Please check your order reference from your SMS or WhatsApp confirmation.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* 2. Customer Support Links */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Customer Services
            </span>

            <a
              href="https://wa.me/233244123456"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-pink-50 transition border border-gray-100 text-xs text-gray-800 font-semibold group"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat with Accra Support on WhatsApp</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-pink group-hover:translate-x-0.5 transition" />
            </a>

            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-pink-50 transition border border-gray-100 text-xs text-gray-800 font-semibold group"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-brand-pink" />
                <span>Delivery Guidelines & 14-Day Exchanges</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-pink group-hover:translate-x-0.5 transition" />
            </Link>

            <Link
              to="/shop"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-pink-50 transition border border-gray-100 text-xs text-gray-800 font-semibold group"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-brand-pink" />
                <span>Browse Latest Bags Catalogue</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-pink group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          {/* 3. Customer Security Reassurance */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Guest Checkout & Instant USSD
            </span>
            <span className="text-gray-400">Accra, Ghana</span>
          </div>

        </div>

      </div>
    </div>
  );
};
