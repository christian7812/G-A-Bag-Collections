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
      <div className="relative w-full h-[540px] sm:h-[640px] lg:h-[720px] overflow-hidden">
        {BAG_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-101 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.name} - Lady carrying bag showcase`}
              style={{ objectPosition: slide.objectPosition || 'center center' }}
              className="w-full h-full object-cover transition-all duration-700"
              loading="eager"
            />
          </div>
        ))}

        {/* Cinematic Vignettes for Luxury Feel & High Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 z-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent z-15 pointer-events-none max-w-2xl" />

        {/* Editorial Caption Card on Bottom-Left */}
        <div className="absolute bottom-6 left-5 sm:bottom-10 sm:left-10 lg:bottom-14 lg:left-16 z-20 max-w-md sm:max-w-lg text-left text-white drop-shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-[#EFECE6] mb-2.5">
            <Sparkles className="w-3 h-3 text-[#D5C6B3]" />
            <span>{current.badge}</span>
            <span>•</span>
            <span className="text-[#D5C6B3]">{current.category}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            {current.name}
          </h1>

          <p className="text-xs sm:text-base text-white/90 font-light line-clamp-2 mt-2 max-w-md hidden sm:block">
            {current.tagline}
          </p>

          <div className="pt-4 sm:pt-5">
            <Link
              to={`/product/${current.slug}`}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-gray-900 hover:bg-[#D5C6B3] hover:text-black transition-all text-sm sm:text-base font-semibold uppercase tracking-widest shadow-xl active:scale-95 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Pagination Dots at Bottom */}
        <div className="absolute bottom-5 right-6 sm:bottom-8 sm:right-12 flex items-center gap-2 z-20">
          {BAG_SLIDES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIdx(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIdx === dotIdx ? 'w-8 bg-white shadow-xs' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
