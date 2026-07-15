import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-secondary border-t border-sandstone/30 mt-16 md:mt-[120px]">
      {/* Brand Ethos & Newsletter Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[80px] py-10 md:py-[80px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 border-b border-sandstone/25">
        
        {/* Left Column: Brand Ethos */}
        <div>
          <h2 className="font-serif text-2xl tracking-[0.15em] uppercase text-dark-surface leading-none mb-1">
            Kanch
          </h2>
          <p className="text-[7px] uppercase tracking-[0.4em] text-dark-surface/50 mb-6">
            Digital Atelier
          </p>
          <p className="font-sans text-sm text-dark-surface/70 max-w-md leading-relaxed">
            Blending the archival richness of Indian craftsmanship with the sophisticated minimalism of high-fashion editorial. We celebrate the &ldquo;Modern Heirloom&rdquo;&mdash;treating every piece of jewellery not as an accessory, but as a silent witness to a legacy.
          </p>
        </div>

        {/* Right Column: Newsletter */}
        <div className="flex flex-col justify-center">
          <span className="label-caps mb-3 block">Subscribe to the Atelier Journal</span>
          <p className="font-serif text-lg text-dark-surface/85 mb-6 max-w-md leading-snug">
            Receive private collection previews, tales of craftsmanship, and exclusive announcements.
          </p>
          
          {subscribed ? (
            <p className="text-emerald text-sm tracking-wider font-semibold animate-fade-in">
              Thank you for subscribing. You are now entered into our private register.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-end max-w-md">
              <div className="flex-1 mr-4">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-underline py-1.5 focus:border-wine"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="group flex items-center justify-center p-2 border-b border-dark-surface/20 hover:border-primary text-dark-surface hover:text-primary transition-colors duration-300"
                aria-label="Submit email"
              >
                <span className="text-xs uppercase tracking-caps mr-2 font-medium">Join</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Directory Links Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[80px] py-8 md:py-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* boutique location details */}
        <div>
          <span className="label-caps mb-4 block">The Boutique Atelier</span>
          <address className="not-italic text-sm text-dark-surface/75 space-y-2 leading-relaxed">
            <p>Taj Palace Arcade, Sardar Patel Marg</p>
            <p>Diplomatic Enclave, New Delhi 110021</p>
            <p className="mt-4">
              <span className="text-dark-surface/50 font-medium">Client Relations:</span>{' '}
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors border-b border-primary/20 pb-0.5">
                +91 99999 99999
              </a>
            </p>
            <p>
              <span className="text-dark-surface/50 font-medium">Atelier Mail:</span>{' '}
              <a href="mailto:concierge@kanchatelier.com" className="hover:text-primary transition-colors">
                concierge@kanchatelier.com
              </a>
            </p>
          </address>
        </div>

        {/* Collections */}
        <div>
          <span className="label-caps mb-4 block">The Collections</span>
          <ul className="text-sm text-dark-surface/75 space-y-3">
            <li>
              <Link to="/collection?category=Kundan" className="hover:text-primary transition-colors">
                Kundan Heirlooms
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Polki" className="hover:text-primary transition-colors">
                Polki &amp; Victorian Collections
              </Link>
            </li>
            <li>
              <Link to="/collection?category=Moissanite" className="hover:text-primary transition-colors">
                Fine Moissanite Sets
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-primary transition-colors">
                All Necklaces
              </Link>
            </li>
          </ul>
        </div>

        {/* Legacy & Info */}
        <div>
          <span className="label-caps mb-4 block">The Legacy</span>
          <ul className="text-sm text-dark-surface/75 space-y-3">
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                Our Heritage Story
              </Link>
            </li>
            <li>
              <Link to="/about#craftsmanship" className="hover:text-primary transition-colors">
                Artisanal Craftsmanship
              </Link>
            </li>
            <li>
              <span className="text-dark-surface/50">Atelier Hours:</span> <br />
              Mon &ndash; Sat, 11:00 AM &ndash; 7:30 PM IST
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="bg-canvas border-t border-sandstone/25 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[80px] flex flex-col md:flex-row items-center justify-between text-[11px] tracking-wider text-dark-surface/50">
          <p>&copy; {new Date().getFullYear()} Kanch Digital Atelier. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Heritage</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Shipping &amp; Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
