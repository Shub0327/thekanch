import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlistItems } = useWishlist();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlating, setSelectedPlating] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state from query parameters
  const isWishlistOnly = searchParams.get('filter') === 'wishlist';
  const urlCategory = searchParams.get('category');
  const urlTag = searchParams.get('tag');

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPlating, selectedPriceRange, sortBy, isWishlistOnly, urlTag]);

  // Filter Categories
  const categoriesList = ['Kundan', 'Moissanite', 'Polki'];
  const platingsList = ['Antique Gold', 'Victorian', 'Gold Plated'];
  const priceRanges = [
    { label: 'Under ₹3,000', value: 'under-3000', min: 0, max: 3000 },
    { label: '₹3,000 – ₹3,500', value: '3000-3500', min: 3000, max: 3500 },
    { label: '₹3,500 – ₹4,000', value: '3500-4000', min: 3500, max: 4000 },
    { label: 'Over ₹4,000', value: 'over-4000', min: 4000, max: 999999 }
  ];

  // Processed Products
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // If wishlist only mode
    if (isWishlistOnly) {
      result = result.filter(p => wishlistItems.some(w => w.id === p.id));
    }

    // Filter by category URL tag or filter tag
    if (urlTag) {
      result = result.filter(p => p.tags.includes(urlTag));
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    // Plating filter
    if (selectedPlating) {
      result = result.filter(p => p.specs.plating.toLowerCase().includes(selectedPlating.toLowerCase()));
    }

    // Price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.value === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // newest/default
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [selectedCategory, selectedPlating, selectedPriceRange, sortBy, isWishlistOnly, wishlistItems, urlTag]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedPlating('');
    setSelectedPriceRange('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[60px] page-fade-in text-left">
      
      {/* Editorial Page Header */}
      <div className="border-b border-sandstone/25 pb-8 mb-12 flex flex-col md:flex-row items-baseline justify-between">
        <div>
          <span className="label-caps mb-2 block text-primary">The Vault</span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark-surface font-normal">
            {isWishlistOnly ? 'My Curated Wishlist' : 'The Necklaces Collection'}
          </h2>
          <p className="font-sans text-xs text-dark-surface/50 mt-2">
            Showing {filteredProducts.length} pieces of heritage art
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="mt-6 md:mt-0 flex items-center space-x-3 select-none">
          <label htmlFor="sort-by" className="label-caps text-[10px] text-dark-surface/60">Sort Vault:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border border-sandstone/30 py-2 px-3 focus:outline-none focus:border-primary text-xs uppercase tracking-wider font-semibold rounded-none"
          >
            <option value="newest">Featured Edits</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-[130px] space-y-8">
            <div className="flex items-center justify-between border-b border-sandstone/20 pb-3">
              <span className="label-caps font-bold">Refine Archive</span>
              <button 
                onClick={handleClearFilters}
                className="text-[10px] text-wine hover:text-primary transition-colors uppercase tracking-wider font-bold"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <span className="label-caps mb-3 block">Category</span>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`block text-xs uppercase tracking-wider ${!selectedCategory ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                >
                  All Heirlooms
                </button>
                {categoriesList.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block text-xs uppercase tracking-wider ${selectedCategory === cat ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                  >
                    {cat} Sets
                  </button>
                ))}
              </div>
            </div>

            {/* Plating Filter */}
            <div>
              <span className="label-caps mb-3 block">Plating Finish</span>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPlating('')}
                  className={`block text-xs uppercase tracking-wider ${!selectedPlating ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                >
                  All Finishes
                </button>
                {platingsList.map(plate => (
                  <button
                    key={plate}
                    onClick={() => setSelectedPlating(plate)}
                    className={`block text-xs uppercase tracking-wider ${selectedPlating === plate ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                  >
                    {plate}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <span className="label-caps mb-3 block">Investment Price</span>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPriceRange('')}
                  className={`block text-xs uppercase tracking-wider ${!selectedPriceRange ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                >
                  Any Price
                </button>
                {priceRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`block text-xs uppercase tracking-wider ${selectedPriceRange === range.value ? 'text-primary font-bold' : 'text-dark-surface/65 hover:text-primary'}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE FILTER TRIGGER BAR */}
        <div className="lg:hidden flex items-center justify-between border border-sandstone/30 p-4 mb-4 select-none">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center space-x-2 text-xs uppercase tracking-caps font-semibold text-dark-surface"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Refine Vault</span>
          </button>
          
          <button
            onClick={handleClearFilters}
            className="text-[10px] text-wine uppercase tracking-wider font-bold"
          >
            Reset
          </button>
        </div>

        {/* PRODUCT GRID & PAGINATION */}
        <div className="flex-grow">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-sandstone/30 bg-secondary/20">
              <h3 className="font-serif text-xl text-dark-surface mb-2">No Pieces Found</h3>
              <p className="font-sans text-xs text-dark-surface/50 max-w-sm mx-auto mb-6">
                We could not find any necklaces matching your active filters. Try broadening your criteria.
              </p>
              <button 
                onClick={handleClearFilters}
                className="bg-primary text-secondary text-xs uppercase tracking-caps py-3 px-6 hover:bg-wine transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-[80px] border-t border-sandstone/25 pt-8 select-none">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-xs uppercase tracking-caps font-semibold text-dark-surface disabled:text-dark-surface/30 disabled:cursor-not-allowed hover:text-primary"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 text-xs font-semibold flex items-center justify-center border transition-colors ${
                          currentPage === page 
                            ? 'bg-primary text-secondary border-primary' 
                            : 'border-sandstone/20 hover:border-primary text-dark-surface'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-xs uppercase tracking-caps font-semibold text-dark-surface disabled:text-dark-surface/30 disabled:cursor-not-allowed hover:text-primary"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER OVERLAY */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-surface/40 backdrop-blur-sm flex justify-start lg:hidden"
          >
            <motion.div 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-[280px] bg-canvas h-full p-6 flex flex-col justify-between border-r border-sandstone/25 overflow-y-auto"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-sandstone/20 pb-3">
                  <span className="label-caps font-bold">Filters</span>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 text-dark-surface hover:text-primary"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Filter */}
                <div>
                  <span className="label-caps mb-3 block">Category</span>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setSelectedCategory(''); setMobileFiltersOpen(false); }}
                      className={`block text-xs uppercase tracking-wider ${!selectedCategory ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                    >
                      All Heirlooms
                    </button>
                    {categoriesList.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setMobileFiltersOpen(false); }}
                        className={`block text-xs uppercase tracking-wider ${selectedCategory === cat ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                      >
                        {cat} Sets
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plating Filter */}
                <div>
                  <span className="label-caps mb-3 block">Plating Finish</span>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setSelectedPlating(''); setMobileFiltersOpen(false); }}
                      className={`block text-xs uppercase tracking-wider ${!selectedPlating ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                    >
                      All Finishes
                    </button>
                    {platingsList.map(plate => (
                      <button
                        key={plate}
                        onClick={() => { setSelectedPlating(plate); setMobileFiltersOpen(false); }}
                        className={`block text-xs uppercase tracking-wider ${selectedPlating === plate ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                      >
                        {plate}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <span className="label-caps mb-3 block">Investment Price</span>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setSelectedPriceRange(''); setMobileFiltersOpen(false); }}
                      className={`block text-xs uppercase tracking-wider ${!selectedPriceRange ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                    >
                      Any Price
                    </button>
                    {priceRanges.map(range => (
                      <button
                        key={range.value}
                        onClick={() => { setSelectedPriceRange(range.value); setMobileFiltersOpen(false); }}
                        className={`block text-xs uppercase tracking-wider ${selectedPriceRange === range.value ? 'text-primary font-bold' : 'text-dark-surface/65'}`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-sandstone/25 pt-6 flex justify-between gap-4">
                <button
                  onClick={() => { handleClearFilters(); setMobileFiltersOpen(false); }}
                  className="flex-1 border border-sandstone py-3 text-xs uppercase tracking-caps font-semibold text-center hover:bg-secondary transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-primary text-secondary py-3 text-xs uppercase tracking-caps font-semibold text-center hover:bg-wine transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
            <div 
              className="flex-1" 
              onClick={() => setMobileFiltersOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
