import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { CATEGORIES } from '../data/mockData';

export const Home: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Handbags', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches'];

  const displayedBags = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-10 pb-16">
      
      {/* 1. HERO BANNER */}
      <HeroSlideshow />

      {/* 2. LADIES BAGS DIRECTLY BENEATH THE HERO BANNER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Quick Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-pink-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-brand-pink text-[10px] font-black uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3 fill-brand-pink" />
              <span>G&A Collection • Women's Bags</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-black text-gray-900 tracking-tight">
              Ladies Bags
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
              Explore authentic leather silhouettes, totes, shoulder bags and clutches.
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs font-bold text-brand-pink hover:text-brand-pink-dark flex items-center gap-1 transition self-start sm:self-auto"
          >
            <span>View Full Boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Pills for Ladies Bags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-pink text-white shadow-xs'
                  : 'bg-white hover:bg-pink-50 text-gray-700 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Ladies Bags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {displayedBags.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
