import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, RefreshCw, Award } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // Select bestsellers (4 beautiful products)
  const bestsellers = productsData.slice(0, 4);

  // Categories with images from the scraped products
  const categories = [
    {
      name: 'Kundan Heirlooms',
      desc: 'Traditional uncut gemstones set in 24k gold foil plating.',
      image: 'https://miranajewels.com/cdn/shop/files/IMG_2148.jpg?v=1782210434',
      link: '/collection?category=Kundan',
    },
    {
      name: 'Fine Moissanite',
      desc: 'Brilliant moissanite diamonds reflecting modern luxury.',
      image: 'https://miranajewels.com/cdn/shop/files/MJNK23N1246-2.jpg?v=1736417748',
      link: '/collection?category=Moissanite',
    },
    {
      name: 'Polki & Victorian',
      desc: 'Rich antique finish and polki stones for the timeless bride.',
      image: 'https://miranajewels.com/cdn/shop/files/MJNK21N341-2.jpg?v=1738734289',
      link: '/collection?category=Polki',
    },
  ];

  return (
    <div className="page-fade-in bg-canvas flex flex-col">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[90vh] bg-secondary flex items-center overflow-hidden border-b border-sandstone/25">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://miranajewels.com/cdn/shop/collections/MJNK21N340-1-Chaitali-Kundan-Long-Necklace-Set-Gold-Look-9_f5c0b58f-aad9-4461-98b2-2f50798e9b07.jpg?v=1740125679"
            alt="Hero Heritage Background"
            className="w-full h-full object-cover object-center opacity-35 filter sepia-[20%] brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] w-full relative z-10 text-left">
          <span className="label-caps mb-4 block text-primary tracking-[0.25em]">The Kanch Autumn Editorial</span>
          <h2 className="font-serif text-5xl md:text-7xl font-normal text-dark-surface tracking-tightest leading-[1.1] max-w-2xl mb-6">
            The Modern Heirloom.
          </h2>
          <p className="font-sans text-base md:text-lg text-dark-surface/75 max-w-md mb-12 leading-relaxed">
            Archival Indian craftsmanship, refined through the stark, sophisticated lens of high-fashion editorial. Handcrafted necklaces built to bear witness to your legacy.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/collection"
              className="bg-primary hover:bg-wine text-secondary text-xs uppercase tracking-caps py-4 px-8 border border-primary hover:border-wine transition-all duration-500 font-medium text-center"
            >
              Explore the Collection
            </Link>
            <Link 
              to="/about"
              className="bg-transparent hover:bg-primary/5 text-primary text-xs uppercase tracking-caps py-4 px-8 border border-primary transition-all duration-500 font-medium text-center"
            >
              Our Heritage Story
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px]">
        <div className="text-center mb-[60px]">
          <span className="label-caps mb-3 block text-primary">Curated Directives</span>
          <h2 className="font-serif text-3xl md:text-4xl text-dark-surface">Browse by Atelier Category</h2>
          <div className="h-px bg-sandstone/30 w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative bg-secondary border border-sandstone/15 flex flex-col h-full overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden bg-canvas relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark-surface/5 group-hover:bg-dark-surface/20 transition-colors duration-500" />
              </div>
              <div className="p-6 text-left flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-xl text-dark-surface mb-2">{cat.name}</h3>
                  <p className="font-sans text-xs text-dark-surface/65 leading-relaxed mb-6">{cat.desc}</p>
                </div>
                <Link 
                  to={cat.link}
                  className="group/btn flex items-center text-xs uppercase tracking-caps font-semibold text-primary group-hover:text-wine transition-colors duration-300"
                >
                  View Archive 
                  <ArrowRight className="w-4.5 h-4.5 ml-2 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Festive Collection Banner */}
      <section className="bg-secondary border-y border-sandstone/25 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          
          {/* Banner Image */}
          <div className="h-[50vh] lg:h-[70vh] bg-canvas relative">
            <img 
              src="https://miranajewels.com/cdn/shop/files/IMG_2148.jpg?v=1782210434"
              alt="Festive Kundan Showcase"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
          </div>

          {/* Banner Content */}
          <div className="px-6 md:px-[80px] py-[80px] lg:py-0 flex flex-col justify-center text-left">
            <span className="label-caps mb-4 block text-wine">Bridal &amp; Festive Edit</span>
            <h2 className="font-serif text-3xl md:text-5xl text-dark-surface tracking-tight leading-tight mb-6">
              Shubh Utsav &mdash; <br />
              The Bridal Chronicle
            </h2>
            <p className="font-sans text-sm md:text-base text-dark-surface/75 max-w-md mb-8 leading-relaxed">
              Exquisite chokers and long layering sets crafted for the Indian bride. Antique victorian plating, pristine kundan setting, and hand-strung semi-precious beads that cascade with royal elegance.
            </p>
            <Link 
              to="/collection?tag=Bridal+Look"
              className="bg-wine hover:bg-primary text-secondary text-xs uppercase tracking-caps py-4 px-8 border border-wine hover:border-primary transition-all duration-500 font-medium text-center w-max"
            >
              Explore Bridal Look
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Bestsellers Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px]">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-[60px]">
          <div className="text-left mb-6 md:mb-0">
            <span className="label-caps mb-3 block text-primary">Atelier Favorites</span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark-surface">The Seasonal Bestsellers</h2>
          </div>
          <Link 
            to="/collection"
            className="group flex items-center text-xs uppercase tracking-caps font-semibold text-primary hover:text-wine transition-colors"
          >
            View Complete Vault
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trust Badges */}
      <section className="bg-[#FAF8F5] border-t border-sandstone/20 py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center p-4">
            <Compass className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-serif text-base text-dark-surface mb-2">Complimentary Shipping</h3>
            <p className="font-sans text-xs text-dark-surface/65 max-w-[200px]">Free insured shipping on all orders across India.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <RefreshCw className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-serif text-base text-dark-surface mb-2">Easy exchanges</h3>
            <p className="font-sans text-xs text-dark-surface/65 max-w-[200px]">Complimentary 7-day exchange window for complete peace of mind.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Award className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-serif text-base text-dark-surface mb-2">Artisanal Craft</h3>
            <p className="font-sans text-xs text-dark-surface/65 max-w-[200px]">Carefully handcrafted by master karigars in traditional settings.</p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-serif text-base text-dark-surface mb-2">100% Authentic</h3>
            <p className="font-sans text-xs text-dark-surface/65 max-w-[200px]">Assured premium base alloys, moissanite gems, and pristine kundan.</p>
          </div>

        </div>
      </section>

    </div>
  );
}
