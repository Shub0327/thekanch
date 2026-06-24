import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Plus, Minus, Info, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { handle } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by handle
  const product = productsData.find(p => p.handle === handle);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px] text-center">
        <span className="label-caps mb-3 block text-wine">Atelier Error</span>
        <h2 className="font-serif text-3xl text-dark-surface mb-6">Heirloom Not Found</h2>
        <p className="font-sans text-sm text-dark-surface/60 max-w-sm mx-auto mb-8">
          The piece you are looking for does not exist in our archives. It may have been a limited-edition design.
        </p>
        <Link to="/collection" className="bg-primary text-secondary text-xs uppercase tracking-caps py-4 px-8 hover:bg-wine transition-colors">
          Browse Active Vault
        </Link>
      </div>
    );
  }

  // Gallery State
  const [activeImage, setActiveImage] = useState('');
  
  // Clasp Variant State
  const [claspVariant, setClaspVariant] = useState('Adjustable Silk Thread');

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Accordion Tabs States
  const [openTab, setOpenTab] = useState('details');

  // Wishlist check
  const wishlisted = isInWishlist(product.id);

  // Sync active image on mount or handle change
  useEffect(() => {
    if (product) {
      setActiveImage(product.featured_image || product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  // Formatting prices
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

  // Clasp Options
  const claspOptions = [
    'Adjustable Silk Thread',
    'Antique Gold Chain',
    'S-Hook Clasp'
  ];

  // Related products: filter by sharing at least one tag or same type, sorted by number of shared tags (excluding self, limit 4)
  const relatedProducts = productsData
    .filter(p => p.id !== product.id)
    .map(p => {
      // Calculate score based on shared tags
      const sharedTags = p.tags.filter(t => product.tags.includes(t)).length;
      return { p, score: sharedTags };
    })
    .sort((a, b) => b.score - a.score)
    .map(item => item.p)
    .slice(0, 4);

  // WhatsApp checkout details
  const getWhatsAppLink = () => {
    const message = `Hello Kanch Atelier! I am interested in purchasing this piece:\n\n*Name:* ${product.title}\n*Price:* ${formattedPrice}\n*Clasp Type:* ${claspVariant}\n*Qty:* ${quantity}\n\nPlease confirm availability.\nLink: ${window.location.href}`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  };

  const toggleTab = (tab) => {
    setOpenTab(prev => prev === tab ? '' : tab);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[60px] page-fade-in text-left">
      
      {/* Breadcrumbs */}
      <nav className="text-[10px] uppercase tracking-[0.2em] text-dark-surface/40 mb-12 select-none">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2.5">&bull;</span>
        <Link to="/collection" className="hover:text-primary transition-colors">Collection</Link>
        <span className="mx-2.5">&bull;</span>
        <span className="text-dark-surface/80">{product.title}</span>
      </nav>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-[120px]">
        
        {/* Left Column: Image Gallery (Span 7) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
          
          {/* Thumbnails */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-0 md:space-y-4 shrink-0 md:w-[80px] scrollbar-none select-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-[60px] h-[60px] md:w-full aspect-square border overflow-hidden rounded-none transition-colors ${
                  activeImage === img ? 'border-primary' : 'border-sandstone/25 hover:border-primary/50'
                }`}
              >
                <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="flex-1 aspect-square bg-secondary border border-sandstone/15 overflow-hidden rounded-none relative select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={product.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {product.compareAtPrice > product.price && (
              <span className="absolute left-0 top-6 bg-wine text-secondary text-[9px] tracking-widest uppercase py-1 px-4">
                The Festive Edit
              </span>
            )}
          </div>

        </div>

        {/* Right Column: Information & CTAs (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="label-caps mb-3 block text-primary">{product.type} &bull; Handcrafted</span>
            
            <h2 className="font-serif text-3xl md:text-4xl text-dark-surface font-normal leading-tight mb-4">
              {product.title}
            </h2>

            {/* Pricing Section */}
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="font-sans text-2xl font-bold text-wine">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="font-sans text-base text-dark-surface/40 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            <p className="font-sans text-sm text-dark-surface/75 leading-relaxed mb-8 border-b border-sandstone/25 pb-8">
              {product.descriptionText}
            </p>

            {/* Selector: Clasp Type */}
            <div className="mb-8 select-none">
              <span className="label-caps mb-3 block">Clasp / Attachment</span>
              <div className="grid grid-cols-1 gap-3">
                {claspOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setClaspVariant(opt)}
                    className={`text-left text-xs uppercase tracking-wider py-3.5 px-4 border rounded-none transition-all duration-300 font-semibold ${
                      claspVariant === opt 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-sandstone/30 text-dark-surface hover:border-primary/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8 select-none">
              <span className="label-caps mb-3 block">Quantity</span>
              <div className="flex items-center border border-sandstone/30 w-max rounded-none">
                <button 
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  className="px-4 py-3 text-dark-surface hover:text-primary transition-colors border-r border-sandstone/25"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-6 py-2 font-sans text-sm font-semibold select-none">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-3 text-dark-surface hover:text-primary transition-colors border-l border-sandstone/25"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-10 select-none">
              
              {/* WhatsApp CTA (Primary design choice) */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary hover:bg-wine text-secondary text-xs uppercase tracking-caps py-4 px-6 text-center border border-primary hover:border-wine transition-all duration-500 font-medium"
              >
                Order on WhatsApp
              </a>

              {/* Standard Add to Cart + Wishlist toggle Row */}
              <div className="flex gap-4">
                
                <button
                  onClick={() => addToCart(product, quantity, claspVariant)}
                  className="flex-1 bg-transparent hover:bg-primary/5 text-primary text-xs uppercase tracking-caps py-4 px-6 border border-primary transition-all duration-300 font-semibold"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border rounded-none transition-all duration-300 ${
                    wishlisted 
                      ? 'border-wine bg-wine/5 text-wine' 
                      : 'border-sandstone/30 text-dark-surface hover:border-primary'
                  }`}
                  aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`w-4.5 h-4.5 ${wishlisted ? 'fill-wine' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Accordion Tabs Details */}
          <div className="border-t border-sandstone/25 pt-4 space-y-4 select-none">
            
            {/* Details Section */}
            <div className="border-b border-sandstone/20 pb-4">
              <button 
                onClick={() => toggleTab('details')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="label-caps font-bold">Heirloom Details</span>
                {openTab === 'details' ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence initial={false}>
                {openTab === 'details' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3"
                  >
                    <table className="w-full text-xs font-sans text-dark-surface/75 space-y-2">
                      <tbody>
                        <tr className="border-b border-sandstone/10 pb-2">
                          <td className="font-semibold py-2 w-1/3">Base Metal</td>
                          <td className="py-2">{product.specs.material}</td>
                        </tr>
                        <tr className="border-b border-sandstone/10 pb-2">
                          <td className="font-semibold py-2">Plating Finish</td>
                          <td className="py-2">{product.specs.plating}</td>
                        </tr>
                        <tr className="border-b border-sandstone/10 pb-2">
                          <td className="font-semibold py-2">Stones</td>
                          <td className="py-2">{product.specs.stones}</td>
                        </tr>
                        <tr className="pb-2">
                          <td className="font-semibold py-2">Finish Look</td>
                          <td className="py-2">{product.specs.finish}</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Size & Fit Section */}
            <div className="border-b border-sandstone/20 pb-4">
              <button 
                onClick={() => toggleTab('size')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="label-caps font-bold">Size &amp; Fit Specs</span>
                {openTab === 'size' ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence initial={false}>
                {openTab === 'size' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-xs font-sans text-dark-surface/75 space-y-2"
                  >
                    <div className="flex justify-between py-1.5 border-b border-sandstone/10">
                      <span className="font-semibold">Necklace Weight</span>
                      <span>{product.weight || '60g'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-sandstone/10">
                      <span className="font-semibold">Necklace Length</span>
                      <span>{product.length || '24 cm'} (adjustable)</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="font-semibold">In the Box</span>
                      <span>1 Necklace Set with Earring Pair</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Care Instructions */}
            <div>
              <button 
                onClick={() => toggleTab('care')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="label-caps font-bold">Preservation Care</span>
                {openTab === 'care' ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence initial={false}>
                {openTab === 'care' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-xs font-sans text-dark-surface/75 leading-relaxed space-y-2"
                  >
                    <p>&bull; Always store jewellery in a separate dry box or zip-lock bag to avoid moisture reactions.</p>
                    <p>&bull; Clean gently with a soft dry cloth after use. Never rub aggressively.</p>
                    <p>&bull; Keep away from chemicals, perfumes, sprays, and water to preserve plating finish.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-sandstone/25 pt-[100px] mb-12">
          <div className="text-left mb-[60px]">
            <span className="label-caps mb-3 block text-primary">Harmonious Additions</span>
            <h2 className="font-serif text-2xl md:text-3xl text-dark-surface">Related Creations</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
