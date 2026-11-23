import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

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
    tagline: 'Hand-stitched diamond quilting in supple calf leather carried with effortless sophistication.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85',
    slug: 'the-sovereign-quilted-flap-bag',
    badge: 'Bestseller',
    objectPosition: 'center 20%',
  },
  {
    id: 'slide-2',
    name: 'Monarque Exotic Top-Handle',
    category: 'Milano Editorial Favorite',
    tagline: 'Tailored outerwear styled with handcrafted gold chain leather hardware held in hand.',
    image: 'https://images.unsplash.com/photo-1729808785118-bbfd41d0149c?auto=format&fit=crop&w=2200&q=85',
    slug: 'monarque-exotic-kelly-bag',
    badge: 'Trending Now',
    objectPosition: 'center 40%',
  },
  {
    id: 'slide-3',
    name: 'Aura Petite Saffiano Crossbody',
    category: 'Hands-Free Crossbody',
    tagline: 'Contoured frame resting comfortably across the torso with refined accents in Milan.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85',
    slug: 'aura-petite-leather-crossbody',
    badge: 'Duomo Milan Edit',
    objectPosition: 'center 35%',
  },
  {
    id: 'slide-4',
    name: 'Capri Gold-Clasp Gala Clutch',
    category: 'Runway Statement Piece',
    tagline: 'Sculptural metallic elegance carried effortlessly in hand through city evenings.',
    image: 'https://images.unsplash.com/photo-1683721122008-48427eb5fec1?auto=format&fit=crop&w=2200&q=85',
    slug: 'capri-gold-clasp-envelope-clutch',
    badge: 'Evening Luxury',
    objectPosition: 'center 48%',
  },
  {
    id: 'slide-5',
    name: 'Palais Executive Leather Tote',
    category: 'Everyday Classic Handbag',
    tagline: 'Spacious luxury silhouette carried comfortably for modern lifestyle and travel.',
    image: 'https://images.unsplash.com/photo-1505464069456-1145548d5c83?auto=format&fit=crop&w=2200&q=85',
    slug: 'palais-structured-croc-tote',
    badge: 'New Season Arrival',
    objectPosition: 'center 30%',
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

          <div className="pt-3 sm:pt-4">
            <Link
              to={`/product/${current.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 hover:bg-[#D5C6B3] hover:text-black transition-all text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Floating Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black shadow-lg flex items-center justify-center transition hover:scale-105 z-20 backdrop-blur-md border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-white text-white hover:text-black shadow-lg flex items-center justify-center transition hover:scale-105 z-20 backdrop-blur-md border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

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
