import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  // Formatting price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOriginalPrice = product.compareAtPrice 
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(product.compareAtPrice)
    : null;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden bg-transparent rounded-none transition-all duration-300">
      
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-secondary border border-sandstone/10 select-none">
        
        {/* Wishlist Overlay Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-4 top-4 z-10 p-2.5 bg-canvas/80 backdrop-blur-sm text-dark-surface hover:text-wine rounded-none border border-sandstone/20 transition-all duration-300 shadow-sm"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-[15px] h-[15px] transition-colors duration-300 ${
              wishlisted ? 'fill-wine text-wine' : 'text-dark-surface'
            }`} 
          />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.handle}`} className="block w-full h-full">
          <motion.img
            src={product.featured_image || product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            loading="lazy"
          />
        </Link>

        {/* Sale Badge */}
        {product.compareAtPrice > product.price && (
          <span className="absolute left-0 top-4 bg-wine text-secondary text-[9px] tracking-widest uppercase py-1 px-3 select-none">
            The Edit
          </span>
        )}
      </div>

      {/* Product Metadata Section */}
      <div className="pt-2 sm:pt-4 flex flex-col flex-grow text-left">
        <span className="label-caps text-[8px] sm:text-[9px] mb-1 sm:mb-1.5 text-primary tracking-[0.2em]">
          {product.specs.plating} &bull; {product.specs.stones.split(',')[0]}
        </span>
        
        <Link to={`/product/${product.handle}`} className="focus:outline-none">
          <h3 className="font-serif text-[13px] sm:text-[17px] text-dark-surface group-hover:text-primary transition-colors duration-300 leading-tight mb-1 sm:mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center space-x-2 sm:space-x-3 mt-auto">
          <span className="font-sans text-[13px] sm:text-[15px] font-semibold text-wine">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="font-sans text-[10px] sm:text-xs text-dark-surface/40 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
