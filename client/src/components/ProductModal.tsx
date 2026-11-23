import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, 
  ShoppingCart, 
  CreditCard, 
  Plus, 
  Minus, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck, 
  ExternalLink 
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductModal: React.FC = () => {
  const navigate = useNavigate();
  const { modalProduct, closeProductModal } = useProducts();
  const { addToCart, getItemInCart, updateQuantity, removeFromCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reset state when modalProduct changes
  useEffect(() => {
    if (modalProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      setAddedAnimation(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalProduct]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductModal]);

  if (!modalProduct) return null;

  const isLiked = isInWishlist(modalProduct.id);
  const cartItem = getItemInCart(modalProduct.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const defaultModel = modalProduct.colors[0] || { name: 'Standard', hex: '#1A1A1A' };
  const currentImage = modalProduct.images[activeImageIndex] || modalProduct.images[0];
  const discountPercent = modalProduct.originalPrice && modalProduct.originalPrice > modalProduct.price
    ? Math.round(((modalProduct.originalPrice - modalProduct.price) / modalProduct.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(modalProduct, quantity, defaultModel, false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    } else {
      addToCart(modalProduct, 1, defaultModel, false);
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(cartItem.id, cartItem.quantity - 1);
      } else {
        removeFromCart(cartItem.id);
      }
    }
  };

  const handleOrderNow = () => {
    addToCart(modalProduct, quantity, defaultModel, false);
    closeProductModal();
    navigate('/checkout');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={closeProductModal}
    >
      <div 
        className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-6 p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-700 flex items-center justify-center transition active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Showcase */}
        <div className="md:w-1/2 flex flex-col gap-3">
          <div className="relative aspect-square w-full rounded-2xl bg-[#F5F2EB] flex items-center justify-center p-6 overflow-hidden">
            <img
              src={currentImage}
              alt={modalProduct.name}
              className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3.5 left-3.5 flex flex-col gap-1">
              {discountPercent > 0 && (
                <span className="bg-gray-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  -{discountPercent}% OFF
                </span>
              )}
              {modalProduct.isNewArrival && (
                <span className="bg-white/95 text-gray-900 border border-gray-200 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  New In
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(modalProduct)}
              className={`absolute top-3.5 right-3.5 p-2 rounded-full transition ${
                isLiked 
                  ? 'text-gray-900 bg-white shadow-xs' 
                  : 'text-gray-400 hover:text-black bg-white/80 hover:bg-white'
              }`}
              aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-gray-900 text-gray-900' : ''}`} />
            </button>
          </div>

          {/* Gallery Thumbnails (if multiple images) */}
          {modalProduct.images && modalProduct.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {modalProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5F2EB] p-1 border-2 transition shrink-0 ${
                    activeImageIndex === idx ? 'border-gray-900' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Category */}
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-gray-500 bg-[#F5F2EB] px-2.5 py-1 rounded-full">
              {modalProduct.category}
            </span>

            {/* Name */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {modalProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                GH₵ {modalProduct.price.toLocaleString()}
              </span>
              {modalProduct.originalPrice && modalProduct.originalPrice > modalProduct.price && (
                <span className="text-xs text-gray-400 line-through">
                  GH₵ {modalProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description & Material */}
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {modalProduct.description}
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-gray-500">
              <p><strong className="text-gray-900 font-semibold">Material:</strong> {modalProduct.material}</p>
              <p><strong className="text-gray-900 font-semibold">Dimensions:</strong> {modalProduct.dimensions}</p>
            </div>

            {/* In-Stock & Nationwide delivery pill */}
            <div className="flex items-center gap-3 pt-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>In Stock ({modalProduct.stock} available)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Truck className="w-3.5 h-3.5" />
                <span>Nationwide Courier</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            {/* Quantity Selector if not in cart */}
            {cartQuantity === 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  <span className="w-10 text-center text-xs font-black text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(modalProduct.stock, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}

            {/* Jumia-Style Add to cart button or Plus/Minus bar */}
            {cartQuantity > 0 ? (
              <div className="w-full h-11 px-2.5 rounded-xl border-2 border-gray-900 bg-white flex items-center justify-between shadow-2xs select-none">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-lg bg-[#F5F2EB] hover:bg-gray-200 active:scale-90 text-gray-900 flex items-center justify-center transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">
                    {cartQuantity}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    in cart
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-black active:scale-90 text-white flex items-center justify-center transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-sm ${
                  addedAnimation 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-900 hover:bg-black text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 stroke-[2]" />
                    <span>Add to Cart • GH₵ {(modalProduct.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>
            )}

            {/* Order Now (Direct Checkout) */}
            <button
              type="button"
              onClick={handleOrderNow}
              className="w-full h-11 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-[#F5F2EB] hover:bg-[#EAE4D7] text-gray-900 border border-gray-300 transition-all duration-200 active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              <span>Instant Checkout / Order Now</span>
            </button>

            {/* Link to Full Page */}
            <div className="text-center pt-1">
              <Link
                to={`/product/${modalProduct.slug}`}
                onClick={closeProductModal}
                className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-black font-semibold hover:underline"
              >
                <span>View Full Product Page & Customer Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
