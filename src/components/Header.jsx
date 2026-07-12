import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { name: 'The Collection', path: '/collection' },
    { name: 'Our Legacy', path: '/about' },
    { name: 'Craftsmanship', path: '/about#craftsmanship' },
  ];

  const activeStyle = ({ isActive }) => 
    `text-primary font-medium tracking-caps text-xs uppercase transition-colors duration-300 border-b border-primary/45 pb-1 ${
      isActive ? '' : 'border-transparent text-dark-surface/70 hover:text-primary'
    }`;

  const inactiveStyle = "text-dark-surface/70 hover:text-primary tracking-caps text-xs uppercase transition-colors duration-300 pb-1 border-b border-transparent";

  return (
    <>
      <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-sandstone/20">
        {/* Announcement Bar */}
        <div className="bg-wine text-secondary text-[10px] tracking-[0.25em] uppercase text-center py-2 px-4 select-none">
          Complimentary Shipping Across India &bull; Discover The Festive Edit
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] h-16 md:h-[90px] flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="w-1/3 flex justify-start md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-dark-surface hover:text-primary transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Navigation Left */}
          <nav className="hidden md:flex items-center space-x-8 w-1/3">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={activeStyle}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Centered Brand Logo */}
          <div className="w-1/3 text-center flex justify-center">
            <Link to="/" className="inline-block group focus:outline-none">
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em] font-normal uppercase text-dark-surface group-hover:text-primary transition-colors duration-300 leading-none">
                Kanch
              </h1>
              <p className="text-[7px] uppercase tracking-[0.4em] text-dark-surface/50 mt-1.5 leading-none">
                Digital Atelier
              </p>
            </Link>
          </div>

          {/* Action Icons Right */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6 w-1/3">
            {/* Wishlist Link */}
            <Link 
              to="/collection?filter=wishlist" 
              className="relative p-2 text-dark-surface hover:text-primary transition-colors duration-300"
              title="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-wine text-secondary text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <Link 
              to="/cart" 
              className="relative p-2 text-dark-surface hover:text-primary transition-colors duration-300"
              title="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-secondary text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-sm flex justify-start animate-fade-in md:hidden">
          <div className="w-[280px] bg-canvas h-full p-6 flex flex-col justify-between border-r border-sandstone/25">
            <div>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-xl tracking-[0.15em] uppercase text-dark-surface">
                    Kanch
                  </h2>
                  <p className="text-[6px] uppercase tracking-[0.3em] text-dark-surface/50 mt-1">
                    Digital Atelier
                  </p>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-dark-surface hover:text-primary"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                <NavLink 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-dark-surface tracking-caps text-xs uppercase font-medium border-b border-transparent pb-1 w-max"
                >
                  Home
                </NavLink>
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-dark-surface tracking-caps text-xs uppercase font-medium border-b border-transparent pb-1 w-max"
                  >
                    {link.name}
                  </NavLink>
                ))}
                <NavLink 
                  to="/cart" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-dark-surface tracking-caps text-xs uppercase font-medium border-b border-transparent pb-1 w-max"
                >
                  My Cart ({cartCount})
                </NavLink>
                <NavLink 
                  to="/collection?filter=wishlist" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-dark-surface tracking-caps text-xs uppercase font-medium border-b border-transparent pb-1 w-max"
                >
                  My Wishlist ({wishlistCount})
                </NavLink>
              </nav>
            </div>

            <div className="border-t border-sandstone/25 pt-6 text-[10px] text-dark-surface/50 tracking-wider">
              &copy; {new Date().getFullYear()} Kanch Atelier. <br />
              Heirlooms of legacy.
            </div>
          </div>
          <div 
            className="flex-1" 
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
