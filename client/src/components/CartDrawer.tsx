import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  Zap, 
  Heart,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    totalItems,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    finalTotal
  } = useCart();
  const { toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode.trim());
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setInputCode('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist(item.product);
    removeFromCart(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-100 animate-fade-in">
          
          {/* Jumia-style Cart Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-pink" />
              <h2 className="font-bold text-base text-gray-900 uppercase tracking-tight">Shopping Cart</h2>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-brand-pink text-white">
                ({totalItems})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-pink-50/70 px-4 py-3 border-b border-pink-100">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-gray-700 font-medium">
                Add <span className="font-bold text-brand-pink">GH₵ {remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-bold text-brand-pink">Free Delivery</span>!
              </p>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You’ve unlocked Free Courier Delivery!</span>
              </div>
            )}
            <div className="w-full bg-pink-200/60 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-brand-pink h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900">Your Cart is Empty!</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Browse our bag categories and discover our latest designer arrivals.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-pink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-pink-dark transition shadow-xs"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3 group">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-20 object-contain rounded-xl border border-gray-100 bg-[#FFF9FA] p-1 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                          <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          Express
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          • In Stock
                        </span>
                      </div>

                      <h4 className="font-bold text-gray-900 hover:text-brand-pink transition line-clamp-1 mt-0.5">
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>

                      <p className="text-xs font-black text-brand-pink mt-1">
                        GH₵ {item.product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-white text-gray-700 hover:text-brand-pink transition flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-6 h-6 rounded bg-white text-gray-700 hover:text-brand-pink transition flex items-center justify-center disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-[11px] text-gray-400 hover:text-brand-pink flex items-center gap-0.5 transition"
                          title="Save for Later"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
              
              {/* Promo Code Input */}
              <div className="space-y-1">
                {promoCode ? (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      Promo "{promoCode}" applied (-GH₵ {discountAmount.toLocaleString()})
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
                      value={inputCode}
                      onChange={(e) => {
                        setInputCode(e.target.value);
                        setPromoMessage(null);
                      }}
                      placeholder="Voucher code (e.g. GA50)"
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-brand-pink uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[10px] font-semibold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1 text-xs text-gray-600 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    GH₵ {subtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-GH₵ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{subtotal >= 2000 ? <strong className="text-emerald-600">FREE</strong> : 'Calculated at checkout'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-900 uppercase">Total:</span>
                <span className="text-xl font-black text-brand-pink">
                  GH₵ {finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Big Jumia Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-pink hover:bg-brand-pink-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>CHECKOUT (GH₵ {finalTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Doorstep Delivery & Paystack MoMo Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
