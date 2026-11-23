import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BagSlide {
  id: string;
  name: string;
  category: string;
  tagline: string;
  image: string;
  slug: string;
  badge: string;
  objectPosition?: string;
}

const BAG_SLIDES: BagSlide[] = [
  {
    id: 'slide-1',
    name: 'The Sovereign Quilted Flap Bag',
    category: 'Signature Luxury Handbag',
    tagline: 'Hand-stitched diamond quilting in supple calf leather with effortless sophistication.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2200&q=85',
    slug: 'the-sovereign-quilted-flap-bag',
    badge: 'Bestseller',
    objectPosition: 'center center',
  },
  {
    id: 'slide-2',
    name: 'Monarque Kelly Top-Handle',
    category: 'Structured Luxury Handbag',
    tagline: 'A timeless silhouette with handcrafted gold hardware and exotic leather finish.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2200&q=85',
    slug: 'monarque-exotic-kelly-bag',
    badge: 'New Arrival',
    objectPosition: 'center center',
  },
  {
    id: 'slide-3',
    name: 'Aura Petite Saffiano Crossbody',
    category: 'Hands-Free Crossbody',
    tagline: 'Compact and refined — the perfect companion for every occasion.',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=2200&q=85',
    slug: 'aura-petite-leather-crossbody',
    badge: 'Trending Now',
    objectPosition: 'center center',
  },
  {
    id: 'slide-4',
    name: 'Capri Gold-Clasp Gala Clutch',
    category: 'Runway Statement Piece',
    tagline: 'Sculptural metallic elegance for evenings that demand the extraordinary.',
    image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=2200&q=85',
    slug: 'capri-gold-clasp-envelope-clutch',
    badge: 'Evening Luxury',
    objectPosition: 'center center',
  },
  {
    id: 'slide-5',
    name: 'Palais Croc Structured Tote',
    category: 'Everyday Classic Tote',
    tagline: 'Spacious luxury silhouette in croc-embossed leather for modern lifestyle.',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=2200&q=85',
    slug: 'palais-structured-croc-tote',
    badge: 'New Season',
    objectPosition: 'center center',
  }
];

export const HeroSlideshow: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % BAG_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + BAG_SLIDES.length) % BAG_SLIDES.length);
  };

  useEffect(() => {
    // Preload all slideshow images for instant switching
    BAG_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isPaused]);

  const current = BAG_SLIDES[currentIdx];

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#141311]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full Width Hero Banner with Responsive Height */}
      <div className="relative w-full h-[420px] sm:h-[580px] lg:h-[720px] overflow-hidden">
        {BAG_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-101 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.name} - bag showcase`}
              style={{ objectPosition: slide.objectPosition || 'center center' }}
              className="w-full h-full object-cover transition-all duration-700"
              loading="eager"
            />
          </div>
        ))}

        {/* Cinematic Vignettes for Luxury Feel & High Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 z-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-15 pointer-events-none" />

        {/* Editorial Caption — centred on mobile, bottom-left on desktop */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14 flex flex-col items-center text-center sm:items-start sm:text-left max-w-full sm:max-w-lg lg:max-w-xl drop-shadow-md text-white">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#EFECE6] mb-2 sm:mb-3">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D5C6B3]" />
            <span>{current.badge}</span>
            <span>•</span>
            <span className="text-[#D5C6B3]">{current.category}</span>
          </div>

          {/* Bag name */}
          <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            {current.name}
          </h1>

          {/* Tagline — hidden on mobile, shown sm+ */}
          <p className="hidden sm:block text-sm sm:text-base text-white/85 font-light line-clamp-2 mt-2 max-w-sm">
            {current.tagline}
          </p>

          {/* CTA Button */}
          <div className="pt-3 sm:pt-5">
            <Link
              to={`/product/${current.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-white text-gray-900 hover:bg-[#D5C6B3] hover:text-black transition-all text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl active:scale-95 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 right-4 sm:bottom-8 sm:right-12 flex items-center gap-1.5 sm:gap-2 z-20">
          {BAG_SLIDES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIdx(dotIdx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentIdx === dotIdx ? 'w-6 sm:w-8 bg-white shadow-xs' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
