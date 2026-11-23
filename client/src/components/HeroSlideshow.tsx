import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSlide {
  id: string;
  name: string;
  category: string;
  tagline: string;
  bagImage: string;
  slug: string;
  badge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    name: 'The Sovereign Quilted Flap Bag',
    category: 'Luxury Handbag',
    tagline: 'Chic, classy and crafted with rose gold hardware and convertible chain strap.',
    bagImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=85',
    slug: 'sovereign-quilted-flap-bag',
    badge: 'Ghana Ladies Favorite',
  },
  {
    id: 'hero-2',
    name: 'Monarque Exotic Kelly Top-Handle',
    category: 'Designer Top-Handle',
    tagline: 'Sculpted elegance with silk twilly scarf & brass padlock hardware. A statement piece.',
    bagImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
    slug: 'monarque-exotic-kelly-bag',
    badge: 'VIP Collection',
  },
  {
    id: 'hero-3',
    name: 'Palais Structured Croc Tote',
    category: 'Work & Travel Tote',
    tagline: 'Timeless crocodile-embossed leather silhouette designed for work and daily elegance.',
    bagImage: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1400&q=85',
    slug: 'palais-structured-croc-tote',
    badge: 'New Season Arrival',
  },
  {
    id: 'hero-4',
    name: 'Belgravia Ruched Cloud Pouch',
    category: 'Evening Shoulder Bag',
    tagline: 'Soft gathered lambskin with radiant gold links. Perfect for weddings & nights out.',
    bagImage: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1400&q=85',
    slug: 'belgravia-ruched-cloud-pouch',
    badge: 'Trending Silhouette',
  },
  {
    id: 'hero-5',
    name: 'Pastel Rose Designer Shoulder Bag',
    category: 'Pastel Collection',
    tagline: 'Blush pink leather with polished turn-lock closure. Feminine charm redefined.',
    bagImage: 'https://images.unsplash.com/photo-1566150902887-9679ec15dcb5?auto=format&fit=crop&w=1400&q=85',
    slug: 'sovereign-quilted-flap-bag',
    badge: 'Best Of Season',
  }
];

export const HeroSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  const current = HERO_SLIDES[currentIndex];

  return (
    <div 
      className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] bg-[#FFF0F5] border-b border-pink-200/70 overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* RIGHT SIDE: Real Handbags in Background (Clearly Visible, Pure Handbags - No People) */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[52%] lg:w-[50%] h-full overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={`slide-bag-${slide.id}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.bagImage}
              alt={`${slide.name} - Handbag`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Clean feather transition between the pink background and the bag photo */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-24 lg:w-36 bg-gradient-to-r from-[#FFF0F5] to-transparent" />
        {/* Mobile readability overlay */}
        <div className="sm:hidden absolute inset-0 bg-[#FFF0F5]/75" />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300/35 rounded-full blur-3xl pointer-events-none" />

      {/* LEFT SIDE: Brand Story, Headline & Actions */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-18 z-10 w-full">
        <div className="max-w-xl space-y-4 sm:space-y-6 text-left">
          
          {/* Pink Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200 shadow-sm backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink fill-brand-pink" />
            <span className="text-[11px] sm:text-xs font-black text-brand-pink uppercase tracking-wider">
              {current.badge}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] text-gray-600 font-medium">{current.category}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.12] tracking-tight drop-shadow-2xs">
            Carry Your Style.<br />
            <span className="italic font-normal text-brand-pink">
              Own Your Confidence.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-base text-gray-700 max-w-lg leading-relaxed font-light">
            {current.tagline}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3 sm:gap-4 flex-wrap">
            <Link
              to={`/product/${current.slug}`}
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 group active:scale-98"
            >
              <span>Shop This Bag</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 sm:py-3.5 rounded-full bg-white/95 hover:bg-white text-gray-800 border border-pink-200 text-xs font-bold uppercase tracking-wider transition shadow-2xs hover:border-brand-pink backdrop-blur-xs"
            >
              View Collection
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-2 flex items-center gap-3 text-xs text-gray-600">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Customer" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Customer" />
              <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Customer" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">
              Loved by <strong className="text-brand-pink">1,000+</strong> ladies in Ghana
            </span>
          </div>

        </div>
      </div>

      {/* Floating Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition border border-pink-100 hover:text-brand-pink z-20 backdrop-blur-xs"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition border border-pink-100 hover:text-brand-pink z-20 backdrop-blur-xs"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-8 bg-brand-pink shadow-xs' : 'w-2 bg-pink-300 hover:bg-pink-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
