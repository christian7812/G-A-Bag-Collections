import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  PackageCheck, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Sparkles,
  Truck,
  MessageCircle,
  Clock,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProducts } from '../context/ProductContext';
import { Order } from '../types';

export const OrderConfirmation: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const location = useLocation();
  const { getOrderByNumber } = useProducts();

  const stateOrder = location.state?.order as Order | undefined;
  const order = stateOrder || (orderNumber ? getOrderByNumber(orderNumber) : undefined);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#1A1A1A', '#D5C6B3', '#8B5A2B', '#EFECE6']
    });
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-gray-900">Order Details Not Found</h2>
        <p className="text-sm text-gray-500">
          We could not locate the requested order. Please check your order reference or contact concierge.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-black transition text-xs font-semibold uppercase tracking-wider"
        >
          Return to Boutique
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-28 space-y-8">
      {/* Jumia-style Success Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            ORDER CONFIRMED & LOGGED
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Thank You For Your Order, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Your handbag order of <strong className="text-gray-900 font-bold">GH₵ {order.total.toLocaleString()}</strong> has been successfully placed. We're getting it ready for courier dispatch!
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-xs font-mono font-bold text-gray-900 border border-gray-200">
          <span>Order Number:</span>
          <span className="text-gray-900">{order.orderNumber}</span>
        </div>
      </div>

      {/* Jumia Order Status Tracking Stepper */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
          Delivery Status Tracker
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {/* Step 1: Placed */}
          <div className="flex sm:flex-col items-center gap-3 sm:text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-gray-900">Order Placed</p>
              <p className="text-[10px] text-gray-400">Verified</p>
            </div>
          </div>

          {/* Step 2: Confirmed */}
          <div className="flex sm:flex-col items-center gap-3 sm:text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-gray-900">Payment / Verified</p>
              <p className="text-[10px] text-gray-400">{order.paymentMethod}</p>
            </div>
          </div>

          {/* Step 3: Packing */}
          <div className="flex sm:flex-col items-center gap-3 sm:text-center">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 ring-4 ring-gray-100 animate-pulse">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-gray-900">Packing in Atelier</p>
              <p className="text-[10px] text-gray-500">Quality check ongoing</p>
            </div>
          </div>

          {/* Step 4: Out for delivery */}
          <div className="flex sm:flex-col items-center gap-3 sm:text-center opacity-60">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-gray-700">Out for Delivery</p>
              <p className="text-[10px] text-gray-400">Estimated 24-48 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
          <div>
            <h2 className="font-bold text-lg text-gray-900">Official Receipt & Summary</h2>
            <p className="text-xs text-gray-400">
              Order created on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <a
              href={`https://wa.me/233541234567?text=Hi%20G%26A%20Collection,%20I%20would%20like%20an%20update%20on%20my%20order%20${order.orderNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Rider</span>
            </a>
          </div>
        </div>

        {/* Customer & Delivery Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-gray-50/60 p-4 rounded-2xl border border-gray-100">
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400">Recipient</span>
            <p className="font-bold text-gray-900">{order.customerName}</p>
            <p className="text-gray-600">{order.customerPhone}</p>
            {order.customerEmail && <p className="text-gray-500">{order.customerEmail}</p>}
          </div>

          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400">Delivery Address</span>
            <p className="font-semibold text-gray-900">{order.deliveryAddress}</p>
            <p className="text-gray-600">{order.city}, {order.region} Region</p>
            {order.deliveryInstructions && (
              <p className="text-[11px] text-gray-900 mt-0.5">Note: {order.deliveryInstructions}</p>
            )}
          </div>

          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400">Payment Info</span>
            <p className="font-semibold text-emerald-700">{order.paymentMethod}</p>
            <p className="text-gray-500 font-mono text-[11px]">Ref: {order.paystackReference || 'CONFIRMED'}</p>
            <p className="text-gray-600 mt-0.5">Est. Arrival: 24–48 Hours</p>
          </div>
        </div>

        {/* Ordered Bags Table */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900">
            Items in this Order
          </h4>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-[#FFF9FA] p-1"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{item.productName}</p>
                    <p className="text-gray-500 text-[11px]">
                      Color: {item.selectedColor} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-black text-gray-900">
                  GH₵ {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-gray-100 pt-4 space-y-1.5 text-xs text-right">
          <div className="flex justify-between sm:justify-end sm:gap-12 text-gray-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-gray-900">GH₵ {order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between sm:justify-end sm:gap-12 text-gray-600">
            <span>Delivery Fee:</span>
            <span className="font-semibold text-gray-900">
              {order.deliveryFee === 0 ? 'FREE' : `GH₵ ${order.deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between sm:justify-end sm:gap-12 text-base font-black text-gray-900 pt-2 border-t border-gray-100">
            <span>Grand Total:</span>
            <span>GH₵ {order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition shadow-sm text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
