import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface MobileBottomNavProps {
  onOpenAccount: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAccount }) => {
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems, openWishlist } = useWishlist();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Hide bottom nav on product detail pages and checkout so action buttons are front and center
  if (location.pathname.startsWith('/product/') || location.pathname === '/checkout') {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 px-2 py-1.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center">
        
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            isActive('/') && location.pathname === '/' ? 'text-brand-pink font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
          {isActive('/') && location.pathname === '/' && (
            <span className="w-1 h-1 rounded-full bg-brand-pink mt-0.5" />
          )}
        </Link>

        {/* Explore / Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            isActive('/shop') ? 'text-brand-pink font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Compass className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] mt-0.5 tracking-tight">Shop</span>
          {isActive('/shop') && (
            <span className="w-1 h-1 rounded-full bg-brand-pink mt-0.5" />
          )}
        </Link>

        {/* Wishlist */}
        <button
          type="button"
          onClick={openWishlist}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-brand-pink transition-all relative"
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-[2]" />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-pink text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalWishlistItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Saved</span>
        </button>

        {/* Bag */}
        <button
          type="button"
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-brand-pink transition-all relative"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-pink text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Bag</span>
        </button>

        {/* Account / Track Orders */}
        <button
          type="button"
          onClick={onOpenAccount}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-brand-pink transition-all"
          aria-label="Account & Orders"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] mt-0.5 tracking-tight">Account</span>
        </button>

      </div>
    </nav>
  );
};
