import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Minus, 
  Plus, 
  Check, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ShoppingBag, 
  CreditCard,
  ChevronRight,
  Sparkles,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { ProductColor } from '../types';
import { GHANA_REGIONS } from '../data/mockData';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getProductBySlug, products } = useProducts();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [colorEffectActive, setColorEffectActive] = useState<boolean>(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  useEffect(() => {
    if (product) {
      const initialColor = product.colors[0] || { name: 'Standard', hex: '#BE123C' };
      setSelectedColor(initialColor);
      setSelectedImage(initialColor.image || product.images[0]);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, slug]);

  const handleSelectModel = (color: ProductColor, idx: number) => {
    setSelectedColor(color);
    if (color.image) {
      setSelectedImage(color.image);
    } else if (product?.images[idx]) {
      setSelectedImage(product.images[idx]);
    }
    setColorEffectActive(true);
    setTimeout(() => setColorEffectActive(false), 600);
  };

  const handleSelectThumbnail = (img: string, idx: number) => {
    setSelectedImage(img);
    if (product?.colors[idx]) {
      setSelectedColor(product.colors[idx]);
      setColorEffectActive(true);
      setTimeout(() => setColorEffectActive(false), 600);
    }
  };

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Handbag Not Found</h2>
        <p className="text-sm text-gray-500">The silhouette you requested is unavailable or has moved.</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 rounded-full bg-brand-pink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-pink-dark transition shadow-sm"
        >
          Return to Boutique
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(product, quantity, selectedColor, true);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    addToCart(product, quantity, selectedColor, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on G&A Collection Ghana`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-32 space-y-10 sm:space-y-16">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-brand-pink transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <Link to="/shop" className="hover:text-brand-pink transition">Bags</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-pink transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <span className="text-gray-900 font-semibold truncate max-w-[160px] sm:max-w-xs">{product.name}</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-brand-pink hover:border-pink-200 transition"
            title="Share Bag"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copiedLink && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full animate-fade-in">
              Link copied!
            </span>
          )}
        </div>
      </div>

      {/* Main Luxury 2-Column Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery (6 Cols) */}
        <div className="lg:col-span-6 space-y-4 sm:sticky sm:top-24">
          
          {/* Hero Image Showcase */}
          <div className="relative aspect-square w-full rounded-3xl bg-[#FFF9FA] border border-pink-100/70 overflow-hidden flex items-center justify-center p-6 sm:p-10 shadow-xs group">
            {/* Dynamic ambient color glow behind bag */}
            <div 
              className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
                colorEffectActive ? 'opacity-30' : 'opacity-10'
              }`}
              style={{ backgroundColor: selectedColor?.hex || '#F8BBD0' }}
            />

            <img
              src={selectedImage || product.images[0]}
              alt={`${product.name} - ${selectedColor?.name || ''}`}
              className={`w-full h-full object-contain filter drop-shadow-lg transition-all duration-500 ease-out group-hover:scale-105 ${
                colorEffectActive ? 'scale-103 opacity-90' : 'scale-100 opacity-100'
              }`}
            />

            {/* Active Model Indicator Floating Pill */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto z-10 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-200/90 shadow-xs max-w-full">
                <span 
                  className="w-3 h-3 rounded-full border border-white shadow-2xs shrink-0 transition-transform duration-300" 
                  style={{ backgroundColor: selectedColor?.hex }}
                />
                <span className="text-[11px] font-bold text-gray-900 truncate">
                  {selectedColor?.name} • <span className="text-brand-pink font-extrabold">{selectedColor?.design || 'Design Model'}</span>
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
              {discountPercent > 0 && (
                <span className="bg-brand-pink text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs tracking-tight">
                  -{discountPercent}% OFF
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-white/95 text-brand-pink border border-pink-200 text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-2xs">
                  NEW ARRIVAL
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full bg-white/95 backdrop-blur-xs shadow-md transition-all active:scale-95 z-10 ${
                isFavorite ? 'text-brand-pink' : 'text-gray-400 hover:text-brand-pink hover:scale-110'
              }`}
              aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-pink text-brand-pink' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectThumbnail(img, idx)}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 border-2 transition-all shrink-0 flex items-center justify-center ${
                  selectedImage === img
                    ? 'border-brand-pink ring-2 ring-brand-pink/20 shadow-xs scale-102'
                    : 'border-gray-200 hover:border-pink-200 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Product Info, Options & Buy Box (6 Cols) */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                {product.category}
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>In Stock • Ready to Dispatch</span>
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-gray-400 font-medium">G&A Collection Atelier • SKU: GA-{product.id.toUpperCase()}</p>
          </div>

          {/* Price Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-4xl font-black text-brand-pink">
                GH₵ {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through">
                  GH₵ {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Tax included. Doorstep courier delivery nationwide across all regions.
            </p>
          </div>

          {/* 3 Different Models of the Bag with Unique Designs & Color Effect */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span>Selected Model & Design:</span>
                <strong className="text-brand-pink font-extrabold">{selectedColor?.name}</strong>
              </span>
              <span className="text-[10px] font-bold text-brand-pink bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100 uppercase tracking-wider">
                3 Models Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {product.colors.slice(0, 3).map((c, idx) => {
                const isSelected = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name + idx}
                    type="button"
                    onClick={() => handleSelectModel(c, idx)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between gap-2.5 relative overflow-hidden ${
                      isSelected
                        ? 'border-brand-pink bg-pink-50/50 ring-2 ring-brand-pink/20 shadow-xs scale-101'
                        : 'border-gray-200 hover:border-pink-200 bg-white hover:bg-pink-50/20'
                    }`}
                  >
                    {/* Top row: Model Tag & Swatch */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Model {idx + 1}
                      </span>
                      <div 
                        className={`w-5 h-5 rounded-full border-2 transition-transform flex items-center justify-center ${
                          isSelected ? 'border-brand-pink scale-110 shadow-xs' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white drop-shadow-sm" />}
                      </div>
                    </div>

                    {/* Model Details */}
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-snug">{c.name}</p>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                        {c.design ? c.design.replace(/Model \d • /, '') : 'Exclusive Design'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-900 block">Quantity:</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-2xl bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-brand-pink hover:text-white transition flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-black text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-9 h-9 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-brand-pink hover:text-white transition flex items-center justify-center disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-gray-500">
                Total: <strong className="text-gray-900 font-black">GH₵ {(product.price * quantity).toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-98 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-pink hover:bg-brand-pink-dark text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Shopping Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • GH₵ {(product.price * quantity).toLocaleString()}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-98"
            >
              <CreditCard className="w-4 h-4 text-pink-300" />
              <span>ORDER NOW</span>
            </button>
          </div>

          {/* Professional Collapsible Specifications & Details */}
          <div className="border-t border-gray-200/80 pt-6 space-y-3">
            
            {/* 1. Description & Story */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-pink-50/30 transition"
              >
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Product Description & Silhouette
                </span>
                {openAccordion === 'details' ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>
              {openAccordion === 'details' && (
                <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed font-light border-t border-gray-50 pt-3">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* 2. Specifications & Dimensions */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-pink-50/30 transition"
              >
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Specifications & Materials
                </span>
                {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>
              {openAccordion === 'specs' && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-gray-50 p-2.5 rounded-xl">
                      <span className="text-gray-400 text-[10px] block uppercase font-bold">Material</span>
                      <span className="font-semibold text-gray-800">Genuine High-Grade Leather</span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-xl">
                      <span className="text-gray-400 text-[10px] block uppercase font-bold">Hardware</span>
                      <span className="font-semibold text-gray-800">Polished Brass / Rose Gold</span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-xl">
                      <span className="text-gray-400 text-[10px] block uppercase font-bold">Dimensions</span>
                      <span className="font-semibold text-gray-800">{product.dimensions}</span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-xl">
                      <span className="text-gray-400 text-[10px] block uppercase font-bold">Lining</span>
                      <span className="font-semibold text-gray-800">Satin Twill Interior</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Delivery & Courier Details */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-pink-50/30 transition"
              >
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Doorstep Delivery & Rates
                </span>
                {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>
              {openAccordion === 'delivery' && (
                <div className="px-4 pb-4 text-xs text-gray-600 space-y-2 border-t border-gray-50 pt-3">
                  <p>• <strong>Doorstep Courier:</strong> Fast and reliable delivery to your exact location across Ghana.</p>
                  <p>• <strong>Complimentary Shipping:</strong> Free doorstep delivery on orders above GH₵ 2,000.</p>
                  <p>• <strong>Payment Methods:</strong> Mobile Money (MTN, Telecel, AT), Cards, or Pay on Delivery.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 px-4 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`p-3 rounded-xl border transition shrink-0 ${
            isFavorite ? 'border-pink-200 bg-pink-50 text-brand-pink' : 'border-gray-200 text-gray-400 hover:text-brand-pink'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-pink text-brand-pink' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 px-3 rounded-xl bg-brand-pink text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm active:scale-98"
        >
          <span>ADD TO BAG</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 py-3 px-3 rounded-xl bg-gray-900 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm active:scale-98"
        >
          <span>ORDER NOW</span>
        </button>
      </div>

      {/* Recommended Related Handbags */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-gray-900 tracking-tight">
                You May Also Like
              </h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">Complementary silhouettes from this collection</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-brand-pink hover:underline">
              Explore All Bags
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
