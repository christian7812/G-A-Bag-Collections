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
  const { products, openProductModal } = useProducts();
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

  const searchResults = searchQuery.trim().length >= 1
    ? products.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all shadow-2xs">
        
        {/* Tier 1: Masthead (Desktop) */}
        <div className="hidden lg:block border-b border-[#E3DFD7] bg-[#EFECE6] px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Brand Name Moved to the Left */}
            <Link 
              to="/" 
              className="font-serif text-xl xl:text-2xl font-normal tracking-[0.24em] text-gray-900 uppercase hover:text-gray-700 transition-colors"
            >
              G&amp;A COLLECTION
            </Link>

            {/* Right: Search Pill & Utility Icons */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                  className="pl-3.5 pr-8 py-1.5 rounded-full border border-gray-300/80 text-xs w-44 bg-white text-gray-900 focus:outline-none focus:border-gray-900 focus:w-56 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                  aria-label="Submit Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>

                {/* Instant Live Dropdown on Desktop */}
                {searchQuery.trim().length >= 1 && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 max-h-72 overflow-y-auto space-y-1">
                    {searchResults.length === 0 ? (
                      <p className="p-3 text-xs text-gray-400 text-center">No bags found</p>
                    ) : (
                      <>
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => {
                              openProductModal(product);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#F5F2EB] text-left transition gap-2"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-9 h-9 object-contain rounded-lg bg-[#F5F2EB] p-0.5 shrink-0"
                              />
                              <div className="truncate">
                                <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                                <span className="text-[10px] text-gray-500">{product.category}</span>
                              </div>
                            </div>
                            <span className="text-xs font-black text-gray-900 shrink-0">
                              GH₵ {product.price.toLocaleString()}
                            </span>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="w-full py-2 text-center text-xs font-bold text-gray-900 hover:bg-gray-100 rounded-xl transition border-t border-gray-100 mt-1 block"
                        >
                          View all in Shop →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setAccountModalOpen(true)}
                className="p-1.5 text-gray-700 hover:text-black transition"
                title="Account & Orders"
                aria-label="Account"
              >
                <User className="w-4 h-4 stroke-[1.75]" />
              </button>

              <button
                type="button"
                onClick={openWishlist}
                className="relative p-1.5 text-gray-700 hover:text-black transition"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 stroke-[1.75]" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-0 right-0 bg-gray-900 text-white font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={openCart}
                className="relative p-1.5 text-gray-700 hover:text-black transition"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-gray-900 text-white font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: Navigation Links Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-12">
            
            {/* Mobile View: Brand on Left, Hamburger & Bag Actions */}
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1 text-gray-800 hover:text-black transition"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5 stroke-[1.75]" />
                </button>

                <Link 
                  to="/" 
                  className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] text-gray-900 uppercase"
                >
                  G&amp;A COLLECTION
                </Link>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-1.5 text-gray-700 hover:text-black transition"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={openWishlist}
                  className="relative p-1.5 text-gray-700 hover:text-black transition"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4 stroke-[1.75]" />
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-0 right-0 bg-gray-900 text-white font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {totalWishlistItems}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={openCart}
                  className="relative p-1.5 text-gray-700 hover:text-black transition"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-gray-900 text-white font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop View: Centered Spaced Navigation Links (No Hamburger on Desktop) */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Centered Spaced Links */}
              <nav className="flex items-center justify-center space-x-10 mx-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                      isActive(link.path)
                        ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5'
                        : 'text-gray-600 hover:text-gray-950'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Right: Quick Search Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-gray-600 hover:text-black transition -mr-1"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
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
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#F5F2EB]/80">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="G&A Collection"
                    className="h-8 w-8 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <span className="font-serif text-sm font-bold text-gray-900 block leading-tight">
                      G&A Collection
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">
                      Luxury Boutique
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
                          ? 'bg-[#F5F2EB] text-gray-900'
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
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-black hover:bg-[#F5F2EB]/50 transition"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[9px] font-bold text-gray-800 bg-[#EFECE6] px-2 py-0.5 rounded-full">
                        {cat.tag}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Saved Wishlist, Order Tracking & Support */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openWishlist();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-[#F5F2EB] text-xs font-semibold text-gray-800 hover:text-black transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-gray-800" />
                      <span>Saved Wishlist</span>
                    </div>
                    {totalWishlistItems > 0 && (
                      <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {totalWishlistItems}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAccountModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-[#F5F2EB] text-xs font-semibold text-gray-800 hover:text-black transition"
                  >
                    <Package className="w-4 h-4 text-gray-800" />
                    <span>Track My Order</span>
                  </button>

                  <a
                    href="https://wa.me/233541234567?text=Hello%20G%26A%20Collection,%20I%20need%20help%20with%20an%20order"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-900 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>

              </div>

              {/* Drawer Footer Banner */}
              <div className="p-4 border-t border-gray-100 bg-[#F5F2EB]/60 text-center">
                <p className="text-[11px] font-medium text-gray-800 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gray-600" />
                  <span>Luxury Silhouettes • Hand-Finished Details</span>
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">Pay via MTN MoMo, Telecel or Cash on Delivery</p>
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
                  className="w-full pl-10 pr-20 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 focus:border-gray-900 rounded-xl outline-none transition bg-gray-50/60"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition"
                >
                  Search
                </button>
              </form>

              {/* Suggestions */}
              {searchQuery.trim().length >= 1 && (
                <div className="mt-2 space-y-1 max-h-64 overflow-y-auto divide-y divide-gray-100">
                  {searchResults.length === 0 ? (
                    <p className="p-3 text-xs text-gray-400 text-center">No bags found matching &quot;{searchQuery}&quot;</p>
                  ) : (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          openProductModal(product);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 text-left transition pt-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded-lg border border-gray-100 bg-[#F5F2EB] p-1"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800 line-clamp-1">{product.name}</p>
                            <span className="text-[10px] text-gray-500 font-medium">{product.category}</span>
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
