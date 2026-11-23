import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Phone,
  CreditCard,
  Building2,
  Tag,
  Zap,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { GHANA_REGIONS } from '../data/mockData';
import { PaymentModal } from '../components/PaymentModal';
import { Order } from '../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    promoCode, 
    applyPromoCode, 
    removePromoCode, 
    clearCart 
  } = useCart();
  const { createOrder } = useProducts();

  // Form Fields - Step 1: Customer & Address
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(GHANA_REGIONS[0].name);
  const [selectedCity, setSelectedCity] = useState(GHANA_REGIONS[0].cities[0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Step 2: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'door' | 'pickup'>('door');
  const [pickupStation, setPickupStation] = useState('Accra Mall Pickup Station - Tetteh Quarshie');

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'cod'>('paystack');

  // Promo code in checkout
  const [checkoutPromo, setCheckoutPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UI state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // Fee Calculations
  const regionData = GHANA_REGIONS.find((r) => r.name === selectedRegion) || GHANA_REGIONS[0];
  const standardFee = deliveryMethod === 'pickup' ? 15 : regionData.fee;
  const deliveryFee = subtotal >= 2000 ? 0 : standardFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegionName = e.target.value;
    setSelectedRegion(newRegionName);
    const targetReg = GHANA_REGIONS.find((r) => r.name === newRegionName);
    if (targetReg && targetReg.cities.length > 0) {
      setSelectedCity(targetReg.cities[0]);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutPromo.trim()) return;
    const res = applyPromoCode(checkoutPromo.trim());
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setCheckoutPromo('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate inputs
    if (!fullName.trim()) {
      setValidationError('Please enter your full name for the delivery tag.');
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setValidationError('Please enter a valid Ghanaian phone number (e.g. 0244123456) for delivery and payment.');
      return;
    }

    if (deliveryMethod === 'door' && !deliveryAddress.trim()) {
      setValidationError('Please provide your street address, house number, or landmark.');
      return;
    }

    if (cart.length === 0) {
      setValidationError('Your shopping bag is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalAddress = deliveryMethod === 'pickup'
        ? `[Pickup Station]: ${pickupStation}`
        : deliveryAddress.trim();

      const orderMethodLabel = paymentMethod === 'paystack'
        ? 'Paystack USSD / MoMo'
        : 'Pay on Delivery (Cash/MoMo to Courier)';

      const order = await createOrder({
        customerName: fullName.trim(),
        customerPhone: cleanPhone,
        customerEmail: email.trim() || undefined,
        region: selectedRegion,
        city: selectedCity,
        deliveryAddress: finalAddress,
        deliveryInstructions: deliveryInstructions.trim() || undefined,
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor.name,
          image: item.product.images[0],
        })),
        subtotal,
        deliveryFee,
        total: grandTotal,
        paymentMethod: orderMethodLabel,
      });

      setActiveOrder(order);

      if (paymentMethod === 'paystack') {
        setShowPaymentModal(true);
      } else {
        // Cash on delivery: redirect directly to confirmation!
        clearCart();
        navigate(`/order-confirmation/${order.orderNumber}`, {
          state: { order },
        });
      }
    } catch (err) {
      setValidationError('Could not initialize your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (updatedOrder: Order) => {
    setShowPaymentModal(false);
    clearCart();
    navigate(`/order-confirmation/${updatedOrder.orderNumber}`, {
      state: { order: updatedOrder },
    });
  };

  if (cart.length === 0 && !activeOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F5F2EB] text-gray-900 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-900">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-gray-500">Please add an authentic handbag to your bag before checking out.</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 rounded-full bg-gray-900 text-white hover:bg-black transition text-xs font-semibold uppercase tracking-wider"
        >
          Explore Handbags
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 space-y-8">
      {/* Jumia-Style Checkout Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 bg-[#F5F2EB] px-2.5 py-0.5 rounded-full">
              SECURE CHECKOUT
            </span>
            <span className="text-xs text-gray-400">• Step-by-Step Order</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Complete Your Bag Order
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted & Paystack Verified</span>
        </div>
      </div>

      {/* Main Grid: Form Left (7 Cols), Order Summary Right (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 3-Step Checkout Flow */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          {validationError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: ADDRESS DETAILS */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="font-bold text-base text-gray-900">
                  1. ADDRESS DETAILS
                </h2>
              </div>
              <span className="text-[11px] text-gray-400">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-gray-800">
                  Full Name <span className="text-gray-900">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Akosua Darko"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Phone number */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800 flex items-center justify-between">
                  <span>Mobile Phone Number <span className="text-gray-900">*</span></span>
                  <span className="text-[10px] text-gray-400">🇬🇭 Ghana</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 024 412 3456"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition"
                />
                <span className="text-[10px] text-gray-400 block">Used for rider calls and MoMo payment prompt</span>
              </div>

              {/* Alternate Phone */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800">
                  Alternate Phone <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  placeholder="e.g. 050 987 6543"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition"
                />
                <span className="text-[10px] text-gray-400 block">Alternative number in case you're unreachable</span>
              </div>

              {/* Email */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-gray-800">
                  Email Address <span className="text-gray-400 font-normal">(For order receipt & tracking updates)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. akosua@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition"
                />
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800">
                  Region <span className="text-gray-900">*</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 cursor-pointer font-medium"
                >
                  {GHANA_REGIONS.map((reg) => (
                    <option key={reg.name} value={reg.name}>
                      {reg.name} Region ({subtotal >= 2000 ? 'Free Delivery' : `GH₵ ${reg.fee}`})
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-800">
                  City / Town <span className="text-gray-900">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 cursor-pointer font-medium"
                >
                  {regionData.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-gray-800">
                  Delivery Address & Prominent Landmark <span className="text-gray-900">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. House No. 24, Spintex Road, near Coastal Junction / Shell Station"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition resize-none"
                />
              </div>

              {/* Delivery Instructions */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-gray-800">
                  Delivery Instructions <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Leave with building receptionist / call 15 mins before arrival"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:border-gray-900 transition"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: DELIVERY METHOD */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="font-bold text-base text-gray-900">
                  2. DELIVERY METHOD
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {/* Option 1: Door Delivery */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                  deliveryMethod === 'door'
                    ? 'border-gray-900 bg-[#F5F2EB]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'door'}
                  onChange={() => setDeliveryMethod('door')}
                  className="mt-1 accent-gray-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-gray-900" />
                      Doorstep Courier Delivery
                    </span>
                    <span className="font-black text-gray-900">
                      {subtotal >= 2000 ? 'FREE' : `GH₵ ${regionData.fee}`}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-0.5">
                    Delivered directly to your home or office address in <strong className="text-gray-700">{selectedCity}, {selectedRegion}</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ⚡ Estimated delivery: Tomorrow or within 24–48 hours
                  </p>
                </div>
              </label>

              {/* Option 2: Pickup Station */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                  deliveryMethod === 'pickup'
                    ? 'border-gray-900 bg-[#F5F2EB]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="mt-1 accent-gray-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-gray-900" />
                      Pick-up Station
                    </span>
                    <span className="font-black text-gray-900">
                      {subtotal >= 2000 ? 'FREE' : 'GH₵ 15'}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-0.5">
                    Collect your order yourself at our secure hub. Cheaper delivery fee.
                  </p>
                  {deliveryMethod === 'pickup' && (
                    <div className="mt-2.5">
                      <select
                        value={pickupStation}
                        onChange={(e) => setPickupStation(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-gray-900"
                      >
                        <option value="Accra Mall Pickup Station - Tetteh Quarshie">Accra Mall Hub - Tetteh Quarshie</option>
                        <option value="Achimota Retail Centre Station">Achimota Retail Centre Station</option>
                        <option value="Kumasi City Mall Hub - Asokwa">Kumasi City Mall Hub - Asokwa</option>
                        <option value="Takoradi Market Circle Station">Takoradi Market Circle Station</option>
                      </select>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h2 className="font-bold text-base text-gray-900">
                  3. PAYMENT METHOD
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {/* Option A: Paystack Instant MoMo & Card */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'paystack'
                    ? 'border-gray-900 bg-[#F5F2EB]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'paystack'}
                  onChange={() => setPaymentMethod('paystack')}
                  className="mt-1 accent-gray-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-gray-900" />
                      Mobile Money & Cards (Instant Paystack)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">
                    Pay instantly via MTN Mobile Money, Telecel Cash, AT Money, or Visa / Mastercard. Instant verification.
                  </p>
                </div>
              </label>

              {/* Option B: Pay on Delivery (Jumia-style COD) */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'cod'
                    ? 'border-gray-900 bg-[#F5F2EB]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-gray-900"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-gray-900" />
                      Pay on Delivery (Cash or MoMo)
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      Cash or MoMo on arrival
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">
                    Pay when the courier rider delivers your handbag. You can inspect the package and pay via MoMo or cash to the dispatch rider.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r bg-gray-900 hover:bg-black hover:brightness-105 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
          >
            <span>CONFIRM ORDER (GH₵ {grandTotal.toLocaleString()})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Right Column: Jumia-style Order Summary & Promo Code (5 Cols) */}
        <aside className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="font-bold text-base text-gray-900">
              ORDER SUMMARY
            </h2>
            <span className="text-xs font-bold text-gray-500">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>

          {/* Items Preview */}
          <div className="space-y-3 max-h-64 overflow-y-auto divide-y divide-gray-100 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-14 object-contain rounded-xl border border-gray-100 bg-[#FFF9FA] p-1 shrink-0"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-gray-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    <span>{item.selectedColor.name}</span>
                    <span>• Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right text-xs font-black text-gray-900">
                  GH₵ {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Jumia-style Promo Code Box */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            {promoCode ? (
              <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  Voucher "{promoCode}" applied (-GH₵ {discountAmount.toLocaleString()})
                </span>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-emerald-700 hover:text-emerald-900 text-[11px] underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={checkoutPromo}
                  onChange={(e) => {
                    setCheckoutPromo(e.target.value);
                    setPromoMessage(null);
                  }}
                  placeholder="Enter Voucher Code (e.g. GA50)"
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-gray-900 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shrink-0"
                >
                  Apply
                </button>
              </form>
            )}
            {promoMessage && (
              <p className={`text-[11px] font-semibold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                {promoMessage.text}
              </p>
            )}
          </div>

          {/* Calculation breakdown */}
          <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
            <div className="flex justify-between">
              <span>Item(s) Subtotal</span>
              <span className="font-bold text-gray-900">
                GH₵ {subtotal.toLocaleString()}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Voucher Discount</span>
                <span>-GH₵ {discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Fee ({deliveryMethod === 'pickup' ? 'Pick-up Hub' : selectedRegion})</span>
              <span className="font-bold text-gray-900">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 uppercase font-black">FREE</span>
                ) : (
                  `GH₵ ${deliveryFee}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-sm font-black text-gray-900 uppercase">Total to Pay</span>
              <span className="text-2xl font-black text-gray-900">
                GH₵ {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Jumia Buyer Protection Box */}
          <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-2 text-[11px] text-gray-500">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>G&A Collection Buyer Protection</span>
            </div>
            <ul className="space-y-1 pl-6 list-disc text-gray-500">
              <li>Full refund if you do not receive your order</li>
              <li>14-day hassle-free return or exchange</li>
              <li>100% Genuine and authenticated female handbags</li>
            </ul>
          </div>
        </aside>

      </div>

      {/* Paystack USSD Modal */}
      {showPaymentModal && activeOrder && (
        <PaymentModal
          order={activeOrder}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
