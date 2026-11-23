import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  RotateCcw,
  Check
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/mockData';

export const Shop: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [selectedSort, setSelectedSort] = useState<string>(searchParams.get('sort') || 'featured');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false);

  // Sync URL search params
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) {
      setSearchQuery(qParam);
    }
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      // Stock
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'new') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // default order
    });
  }, [products, searchQuery, selectedCategory, selectedSort, maxPrice, onlyInStock]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSort('featured');
    setMaxPrice(3500);
    setOnlyInStock(false);
    setSearchParams({});
    setShowFiltersPanel(false);
  };

  const allCategories = ['All', ...CATEGORIES.map((c) => c.name)];

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (maxPrice < 3500 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-pink" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-pink">
              G&A Collection Boutique
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Shop All Handbags
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-lg">
            Discover modern luxury silhouettes crafted for elegance, everyday sophistication, and special occasions.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <span>Showing</span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 font-bold">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Bag' : 'Bags'}
          </span>
        </div>
      </div>

      {/* Modern Top Controls Bar: Search + Category Pills + Sort & Filter Toggle */}
      <div className="space-y-3.5">
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Minimalist Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bags, designs, colors..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-200 bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-pink transition shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Row: Sort Dropdown & Filter Toggle */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition border ${
                showFiltersPanel || activeFiltersCount > 0
                  ? 'border-brand-pink bg-pink-50 text-brand-pink'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand-pink text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-full pl-3.5 pr-8 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-pink cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured First</option>
                <option value="new">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Category Pills Bar (Smooth Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-brand-pink text-white shadow-xs'
                    : 'bg-white hover:bg-pink-50/60 text-gray-700 border border-gray-200 hover:border-pink-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Collapsible Modern Filter Drawer */}
        {showFiltersPanel && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Refine Selection
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-brand-pink hover:underline font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              {/* Max Price Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-semibold">Maximum Budget:</span>
                  <span className="font-extrabold text-brand-pink">GH₵ {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={3500}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-pink cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>GH₵ 500</span>
                  <span>GH₵ 3,500</span>
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center">
                <label className="flex items-center gap-2.5 text-xs text-gray-800 font-bold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-pink accent-brand-pink focus:ring-0 cursor-pointer"
                  />
                  <span>Show In-Stock Handbags Only</span>
                </label>
              </div>

              {/* Close Drawer Button */}
              <div className="flex sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowFiltersPanel(false)}
                  className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <span className="text-gray-400 text-[11px] font-medium">Active:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-brand-pink font-bold text-[11px]">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:opacity-75" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-brand-pink font-bold text-[11px]">
                &quot;{searchQuery}&quot;
                <X className="w-3 h-3 cursor-pointer hover:opacity-75" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {maxPrice < 3500 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-brand-pink font-bold text-[11px]">
                Up to GH₵ {maxPrice.toLocaleString()}
                <X className="w-3 h-3 cursor-pointer hover:opacity-75" onClick={() => setMaxPrice(3500)} />
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-brand-pink font-bold text-[11px]">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer hover:opacity-75" onClick={() => setOnlyInStock(false)} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-gray-500 hover:text-brand-pink underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}

      </div>

      {/* Full-Width Spacious Product Grid (Simple, Modern, Clean) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-20 text-center border border-gray-100 shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-pink-50 text-brand-pink flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-gray-900">No handbags found</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            We couldn&apos;t find any bags matching your current filters. Try resetting or selecting another category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-black uppercase tracking-wider transition shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
