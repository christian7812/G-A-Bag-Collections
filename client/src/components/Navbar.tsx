import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User, 
  Heart,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { AccountModal } from './AccountModal';

export const Navbar: React.FC = () => {
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems, openWishlist } = useWishlist();
  const { products } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  const searchResults = searchQuery.trim().length >= 2
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Handbags', path: '/shop?category=Handbags' },
    { name: 'Tote Bags', path: '/shop?category=Tote%20Bags' },
    { name: 'Crossbody', path: '/shop?category=Crossbody%20Bags' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categoryShortcuts = [
    { name: 'Handbags', path: '/shop?category=Handbags', tag: 'Bestseller' },
    { name: 'Tote Bags', path: '/shop?category=Tote%20Bags', tag: 'Work & Travel' },
    { name: 'Shoulder Bags', path: '/shop?category=Shoulder%20Bags', tag: 'Everyday' },
    { name: 'Crossbody Bags', path: '/shop?category=Crossbody%20Bags', tag: 'Trendy' },
    { name: 'Evening Clutches', path: '/shop?category=Clutches', tag: 'Gala & Dinner' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100/70 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            
            {/* Left: Mobile Menu Button & Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Modern Hamburger Trigger (Mobile only) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-1 text-gray-700 hover:text-brand-pink hover:bg-pink-50/60 rounded-xl transition lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo & Name */}
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="G&A Collection"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover border border-pink-200 shadow-2xs"
                />
                <div className="flex flex-col text-left">
                  <span className="font-serif text-base sm:text-xl font-black tracking-tight text-gray-900 leading-none">
                    G&A <span className="text-brand-pink font-serif">Collection</span>
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400 mt-0.5">
                    Women's Bags
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold tracking-wide transition-colors ${
                    isActive(link.path)
                      ? 'text-brand-pink border-b-2 border-brand-pink pb-0.5'
                      : 'text-gray-600 hover:text-brand-pink'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Modern Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-brand-pink hover:bg-pink-50/60 rounded-xl transition"
                title="Search Bags"
                aria-label="Search Bags"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Button (Desktop only on top bar; mobile uses bottom nav) */}
              <button
                type="button"
                onClick={openWishlist}
                className="hidden sm:flex relative p-2 text-gray-700 hover:text-brand-pink hover:bg-pink-50/60 rounded-xl transition"
                title="View Wishlist"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-pink text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </button>

              {/* Customer Account Button (Desktop) */}
              <button
                type="button"
                onClick={() => setAccountModalOpen(true)}
                className="hidden sm:flex p-2 text-gray-700 hover:text-brand-pink hover:bg-pink-50/60 rounded-xl transition"
                title="Track My Order"
                aria-label="Track My Order"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button (Always Visible) */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-gray-700 hover:text-brand-pink hover:bg-pink-50/60 rounded-xl transition"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-pink text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Modern Slide-Over Drawer for Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Off-Canvas Slide Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between animate-fade-in">
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-pink-50/40">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="G&A Collection"
                    className="h-8 w-8 rounded-xl object-cover border border-pink-200"
                  />
                  <div>
                    <span className="font-serif text-sm font-bold text-gray-900 block leading-tight">
                      G&A <span className="text-brand-pink">Collection</span>
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">
                      Accra, Ghana
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Main Pages Links */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-3 block mb-1">
                    Explore
                  </span>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive(link.path)
                          ? 'bg-pink-50 text-brand-pink'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  ))}
                </div>

                {/* Popular Bag Categories Shortcuts */}
                <div className="space-y-1 pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-3 block mb-1">
                    Shop By Silhouette
                  </span>
                  {categoryShortcuts.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-brand-pink hover:bg-pink-50/50 transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[9px] font-bold text-brand-pink bg-pink-50 px-2 py-0.5 rounded-full">
                        {cat.tag}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Order Tracking & Support Pill */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAccountModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-xs font-bold text-gray-800 hover:text-brand-pink transition"
                  >
                    <Package className="w-4 h-4 text-brand-pink" />
                    <span>Track My Order</span>
                  </button>

                  <a
                    href="https://wa.me/233541234567?text=Hello%20G%26A%20Collection,%20I%20need%20help%20with%20an%20order"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>

              </div>

              {/* Drawer Footer Banner */}
              <div className="p-4 border-t border-gray-100 bg-pink-50/40 text-center">
                <p className="text-[11px] font-bold text-brand-pink flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Free Accra Delivery for orders GH₵ 2,000+</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">Pay via MTN MoMo, Telecel or Cash on Delivery</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modern Interactive Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white p-4 sm:p-6 shadow-xl border-b border-gray-100 animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Search Handbags & Totes
                </span>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search handbag, tote, color, category..."
                  className="w-full pl-10 pr-20 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 focus:border-brand-pink rounded-xl outline-none transition bg-gray-50/60"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-brand-pink text-white text-xs font-bold rounded-lg hover:bg-brand-pink-dark transition"
                >
                  Search
                </button>
              </form>

              {/* Suggestions */}
              {searchQuery.trim().length >= 2 && (
                <div className="mt-2 space-y-1 max-h-64 overflow-y-auto divide-y divide-gray-100">
                  {searchResults.length === 0 ? (
                    <p className="p-3 text-xs text-gray-400 text-center">No bags found matching "{searchQuery}"</p>
                  ) : (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          navigate(`/product/${product.slug}`);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-pink-50 text-left transition pt-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded-lg border border-gray-100 bg-[#FFF9FA] p-1"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 line-clamp-1">{product.name}</p>
                            <span className="text-[10px] text-brand-pink font-semibold">{product.category}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-gray-900 shrink-0">
                          GH₵ {product.price.toLocaleString()}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Account & Order Tracking Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
};
