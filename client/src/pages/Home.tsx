import React, { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { HeroSlideshow } from '../components/HeroSlideshow';

export const Home: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Handbags', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches'];

  const displayedBags = products.filter((p) => {
    if (!p.images || !p.images[0] || p.images[0].includes('1566150902887-9679ec15dcb5') || p.id === 'pa-prod-05' || p.id === 'pa-prod-09') {
      return false;
    }
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchCat = (p.category || '').toLowerCase().includes(q);
      const matchMat = (p.material || '').toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchMat) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 sm:space-y-16 pb-20 bg-[#FCFBF9]">
      
      {/* 1. HERO SLIDESHOW WITH BAGS (Pure Handbags - No Models) */}
      <HeroSlideshow />

      {/* 2. SECTION TITLE & FILTER PILLS DIRECTLY BENEATH HERO (Mastle Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Centered Collection Header */}
        <div className="text-center space-y-2 pt-4 sm:pt-6">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight">
            See Collection
          </h2>
        </div>

        {/* Search Bar on Home Page */}
        <div className="max-w-md mx-auto relative px-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all bags, totes, clutches..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-200/90 bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Centered Category Filter Pills (Mastle Style) */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#D5C6B3] text-gray-900 font-semibold shadow-2xs'
                    : 'bg-white hover:bg-[#FAF8F5] text-gray-600 border border-gray-200/90'
                }`}
              >
                <span>{cat === 'All' ? 'All Handbags' : cat}</span>
                {cat === 'All' && <ChevronDown className="w-3 h-3 text-gray-700" />}
              </button>
            );
          })}
        </div>

        {/* 3. MASTLE-STYLE 3-COLUMN PRODUCT GRID (Desktop 3 Cols, Mobile 2 Cols) */}
        {displayedBags.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-gray-500">No bags found matching &quot;{searchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8 lg:gap-10 pt-2 pb-6">
            {displayedBags.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
