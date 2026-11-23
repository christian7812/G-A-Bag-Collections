import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Check, ShoppingBag, CreditCard, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, getItemInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isLiked = isInWishlist(product.id);
  const cartItem = getItemInCart(product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const defaultModel = product.colors[0] || { name: 'Standard', hex: '#BE123C' };
  const currentImage = product.images[0];

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultModel, false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultModel, false);
    navigate('/checkout');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Product Image Stage */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[0.95] w-full overflow-hidden bg-[#FFF9FA] p-4 flex items-center justify-center"
      >
        <img
          src={currentImage}
          alt={product.name}
          className="h-full w-full object-contain object-center transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition z-10 ${
            isLiked ? 'text-brand-pink' : 'text-gray-400 hover:text-brand-pink'
          }`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-brand-pink text-brand-pink' : ''}`} />
        </button>

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {discountPercent > 0 && (
            <span className="bg-brand-pink text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs tracking-tight">
              -{discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-white/95 text-brand-pink border border-pink-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Express badge bottom-left */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs">
            <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            <span>G&A Express</span>
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-pink block mb-1">
            {product.category}
          </span>

          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-2 text-xs sm:text-sm font-bold text-gray-900 hover:text-brand-pink transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Price with discount display */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              GH₵ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                GH₵ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: ADD TO CART & ORDER NOW Side-by-Side */}
        <div className="mt-3 pt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`py-2 px-1 sm:px-2 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-200 border border-brand-pink text-brand-pink hover:bg-pink-50 active:scale-98 ${
              addedAnimation ? 'bg-emerald-600 text-white border-emerald-600' : ''
            }`}
            title="Add to shopping bag"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="truncate">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="truncate">{cartQuantity > 0 ? `In Bag (${cartQuantity})` : 'Add To Cart'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleOrderNow}
            className="py-2 px-1 sm:px-2 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 bg-brand-pink hover:bg-brand-pink-dark text-white shadow-xs active:scale-98 transition-all duration-200"
            title="Order now (instant express checkout)"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="truncate">Order Now</span>
          </button>
        </div>

      </div>

    </article>
  );
};
