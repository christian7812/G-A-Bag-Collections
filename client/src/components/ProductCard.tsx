import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Check, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { openProductModal } = useProducts();
  const { addToCart, getItemInCart, updateQuantity, removeFromCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isLiked = isInWishlist(product.id);
  const cartItem = getItemInCart(product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const defaultModel = product.colors[0] || { name: 'Standard', hex: '#1A1A1A' };
  const currentImage = product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultModel, false);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    } else {
      addToCart(product, 1, defaultModel, false);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(cartItem.id, cartItem.quantity - 1);
      } else {
        removeFromCart(cartItem.id);
      }
    }
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

  if (imgError) {
    return null;
  }

  return (
    <article className="group flex flex-col space-y-3 relative text-left">
      
      {/* 1. Mastle-style Warm Neutral Image Stage Box */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EB] rounded-2xl flex items-center justify-center p-2.5 sm:p-4 md:p-5 transition-colors group-hover:bg-[#EFEAE2]">
        <button
          type="button"
          onClick={() => openProductModal(product)}
          className="relative block w-full h-full flex items-center justify-center cursor-pointer focus:outline-none group/img"
          title={`Click to view ${product.name} in modal`}
          aria-label={`View ${product.name} in modal`}
        >
          <img
            src={currentImage}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-contain object-center filter drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-106"
          />
          {/* Quick View Hover Badge */}
          <span className="absolute bottom-2 inset-x-4 py-1.5 px-3 rounded-full bg-white/90 backdrop-blur-xs text-gray-900 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 shadow-xs flex items-center justify-center gap-1.5 pointer-events-none">
            <Eye className="w-3 h-3 text-gray-900" />
            <span>Quick View</span>
          </span>
        </button>

        {/* Top-Right Outline Wishlist / Bookmark Icon */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full transition z-10 ${
            isLiked 
              ? 'text-gray-900 bg-white/95 shadow-xs' 
              : 'text-gray-400 hover:text-black hover:bg-white/70'
          }`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 stroke-[1.75] ${isLiked ? 'fill-gray-900 text-gray-900' : ''}`} />
        </button>

        {/* Top-Left Subtle Tag */}
        {product.isNewArrival ? (
          <span className="absolute top-3.5 left-3.5 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs z-10">
            New In
          </span>
        ) : product.originalPrice && product.originalPrice > product.price ? (
          <span className="absolute top-3.5 left-3.5 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs z-10">
            Sale
          </span>
        ) : null}
      </div>

      {/* 2. Product Information Area */}
      <div className="space-y-1.5 px-0.5">
        
        {/* Row 1: Title on Left, Shopping Bag Icon on Right */}
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="font-medium text-sm sm:text-base text-gray-900 hover:text-black transition-colors truncate"
            title={product.name}
          >
            {product.name}
          </Link>
          
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition shrink-0 ${
              cartQuantity > 0 ? 'text-gray-900 bg-[#F5F2EB]' : ''
            }`}
            title="Add to cart"
            aria-label="Add to cart"
          >
            {cartQuantity > 0 ? (
              <span className="text-[10px] font-black bg-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartQuantity}
              </span>
            ) : addedAnimation ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShoppingCart className="w-4 h-4 stroke-[1.75]" />
            )}
          </button>
        </div>

        {/* Row 2: Subtle Muted Description / Material */}
        <p className="text-xs text-gray-400 font-light truncate">
          {product.material || product.description}
        </p>

        {/* Row 3: Price */}
        <div className="pt-0.5 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            GH₵ {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through font-normal">
              GH₵ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Row 4: Jumia-style Full-Width Action Button (Add to cart -> Plus / Minus controls) */}
        <div className="pt-2">
          {cartQuantity > 0 ? (
            <div 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full h-10 px-2 rounded-xl border border-gray-900 bg-white flex items-center justify-between shadow-2xs select-none"
            >
              <button
                type="button"
                onClick={handleDecrement}
                className="w-8 h-8 rounded-lg bg-[#F5F2EB] hover:bg-gray-200 active:scale-90 text-gray-900 flex items-center justify-center transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                <span className="text-sm font-black text-gray-900">
                  {cartQuantity}
                </span>
                <span className="text-[11px] font-semibold text-gray-500 hidden sm:inline">
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
              onClick={handleQuickAdd}
              className={`w-full h-10 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-2xs ${
                addedAnimation 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-900 hover:bg-black text-white'
              }`}
              title="Add to cart"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 shrink-0 stroke-[2]" />
                  <span>Add to cart</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

    </article>
  );
};
