import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.colors[0] || { name: 'Standard', hex: '#E11D48' });
    removeFromWishlist(product.id);
    closeWishlist();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-100 animate-fade-in">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-pink-50/40">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
              <h2 className="font-serif text-lg font-bold text-gray-900">Saved Bags</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-pink text-white">
                {wishlist.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {wishlist.length > 0 && (
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-[11px] font-semibold text-gray-400 hover:text-red-500 transition mr-2"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={closeWishlist}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-gray-900">Your Wishlist is Empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Tap the heart icon on any handbag you love to save it here for later.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeWishlist}
                  className="px-6 py-2.5 rounded-full bg-brand-pink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-pink-dark transition shadow-xs"
                >
                  Explore Handbags
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-pink-200 bg-white transition group"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={closeWishlist}
                    className="w-18 h-18 rounded-lg overflow-hidden bg-pink-50/40 p-1 shrink-0"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-brand-pink block">
                        {product.category}
                      </span>
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={closeWishlist}
                        className="text-xs font-bold text-gray-900 hover:text-brand-pink transition truncate block"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs font-extrabold text-gray-900 mt-1 block">
                        GH₵ {product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-brand-pink hover:bg-brand-pink-dark text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <Link
                to="/shop"
                onClick={closeWishlist}
                className="w-full py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-pink-50 text-gray-800 text-xs font-bold uppercase tracking-wider transition text-center flex items-center justify-center gap-1.5"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
