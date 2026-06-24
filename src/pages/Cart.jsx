import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    if (couponCode.toUpperCase() === 'HERITAGE10') {
      setAppliedDiscount(10);
      setCouponSuccess('Coupon "HERITAGE10" (10% Off) applied successfully.');
    } else {
      setCouponError('Invalid coupon code. Try "HERITAGE10".');
    }
  };

  const discountAmount = (cartTotal * appliedDiscount) / 100;
  const finalTotal = cartTotal - discountAmount;

  // Formatting currency helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // WhatsApp checkout message
  const getWhatsAppCheckoutLink = () => {
    const itemsList = cartItems.map(
      (item, idx) => `${idx + 1}. ${item.product.title} (${item.variant}) x${item.quantity} - ${formatCurrency(item.product.price * item.quantity)}`
    ).join('\n');
    
    const message = `Hello Kanch Atelier! I would like to place an order for the following creations:\n\n${itemsList}\n\n*Subtotal:* ${formatCurrency(cartTotal)}\n${appliedDiscount > 0 ? `*Discount (10%):* -${formatCurrency(discountAmount)}\n` : ''}*Total Amount:* ${formatCurrency(finalTotal)}\n\nPlease assist with the delivery and payment process.\nThank you!`;
    
    return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  };

  const handleSimulatedCheckout = () => {
    setShowCheckoutModal(true);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px] text-center page-fade-in">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 text-primary/40 mb-6" />
          <span className="label-caps mb-3 block text-primary">Your bag is empty</span>
          <h2 className="font-serif text-3xl text-dark-surface mb-6 font-normal">Awaiting Your Selection</h2>
          <p className="font-sans text-sm text-dark-surface/60 leading-relaxed mb-8">
            Explore our curated collections of Kundan and Polki necklaces. Add pieces of legacy to your personal catalog.
          </p>
          <Link 
            to="/collection"
            className="bg-primary hover:bg-wine text-secondary text-xs uppercase tracking-caps py-4 px-8 border border-primary hover:border-wine transition-all duration-300 font-medium w-full text-center"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[60px] page-fade-in text-left">
      <div className="border-b border-sandstone/25 pb-8 mb-12">
        <span className="label-caps mb-2 block text-primary">Shopping Bag</span>
        <h2 className="font-serif text-3xl md:text-5xl text-dark-surface font-normal">Selected Creations</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Cart Items List (Span 7) */}
        <div className="lg:col-span-7 space-y-8 select-none">
          {cartItems.map((item, index) => (
            <div 
              key={`${item.product.id}-${item.variant}`}
              className="flex gap-6 pb-8 border-b border-sandstone/20 last:border-0 last:pb-0"
            >
              {/* Thumbnail */}
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] aspect-square overflow-hidden bg-secondary border border-sandstone/10 shrink-0">
                <img src={item.product.featured_image || item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
              </div>

              {/* Details & Actions */}
              <div className="flex-grow flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/product/${item.product.handle}`} className="focus:outline-none">
                      <h3 className="font-serif text-lg text-dark-surface hover:text-primary transition-colors leading-tight">
                        {item.product.title}
                      </h3>
                    </Link>
                    <span className="font-sans text-sm font-semibold text-wine shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-dark-surface/50 mt-1">
                    Option: {item.variant}
                  </p>
                  <p className="text-[10px] text-dark-surface/40 mt-0.5">
                    Unit Price: {formatCurrency(item.product.price)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {/* Quantity Editor */}
                  <div className="flex items-center border border-sandstone/30 w-max rounded-none">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-dark-surface hover:text-primary transition-colors border-r border-sandstone/25"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-1 font-sans text-xs font-semibold select-none">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-dark-surface hover:text-primary transition-colors border-l border-sandstone/25"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.variant)}
                    className="flex items-center space-x-1.5 text-dark-surface/40 hover:text-wine transition-colors duration-300 py-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary & Coupon (Span 5) */}
        <div className="lg:col-span-5">
          <div className="sticky top-[130px] bg-secondary/40 border border-sandstone/25 p-8 space-y-6">
            <span className="label-caps border-b border-sandstone/20 pb-3 block">Order Summary</span>
            
            {/* Totals Table */}
            <div className="space-y-4 text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-dark-surface/75">Vault Subtotal</span>
                <span className="font-semibold text-dark-surface">{formatCurrency(cartTotal)}</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-wine">
                  <span>Atelier Discount (10%)</span>
                  <span>&minus; {formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-dark-surface/75">Insured Shipping</span>
                <span className="text-emerald font-semibold uppercase text-xs tracking-wider">Complimentary</span>
              </div>

              <div className="h-px bg-sandstone/20 pt-2" />

              <div className="flex justify-between items-baseline pt-2">
                <span className="font-serif text-base font-semibold">Total Investment</span>
                <span className="font-sans text-xl font-bold text-wine">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-4 border-t border-sandstone/20 select-none">
              <span className="label-caps mb-3 block">Apply Promocode</span>
              <form onSubmit={handleApplyCoupon} className="flex">
                <input
                  type="text"
                  placeholder="Code (e.g. HERITAGE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="input-underline py-1 mr-4 text-xs font-semibold uppercase placeholder:normal-case"
                  disabled={appliedDiscount > 0}
                />
                <button
                  type="submit"
                  disabled={appliedDiscount > 0}
                  className="text-xs uppercase tracking-caps font-semibold border-b border-dark-surface/20 hover:border-primary disabled:border-transparent disabled:text-dark-surface/30 transition-all py-1 shrink-0"
                >
                  Apply
                </button>
              </form>
              
              {couponError && <p className="text-wine text-[10px] tracking-wider mt-2">{couponError}</p>}
              {couponSuccess && <p className="text-emerald text-[10px] tracking-wider mt-2 font-semibold">{couponSuccess}</p>}
            </div>

            {/* Checkout CTAs */}
            <div className="pt-4 space-y-3 border-t border-sandstone/20 select-none">
              
              {/* WhatsApp Checkout (Primary design choice) */}
              <a
                href={getWhatsAppCheckoutLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary hover:bg-wine text-secondary text-xs uppercase tracking-caps py-4 px-6 text-center border border-primary hover:border-wine transition-all duration-500 font-semibold"
              >
                Checkout via WhatsApp
              </a>

              {/* Standard checkout */}
              <button
                onClick={handleSimulatedCheckout}
                className="w-full bg-transparent hover:bg-primary/5 text-primary text-xs uppercase tracking-caps py-4 px-6 border border-primary transition-all duration-300 font-semibold"
              >
                Place Simulated Order
              </button>
            </div>
            
            <p className="text-[10px] text-dark-surface/40 text-center leading-relaxed mt-4">
              Protected by SSL encryption. All shipments are fully insured against transit loss.
            </p>
          </div>
        </div>

      </div>

      {/* Checkout Success Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-dark-surface/60 backdrop-blur-sm flex items-center justify-center p-6 select-none animate-fade-in">
          <div className="bg-canvas border border-sandstone max-w-md w-full p-8 text-center shadow-lg relative">
            <div className="w-12 h-12 bg-emerald/10 text-emerald flex items-center justify-center rounded-full mx-auto mb-6">
              <Check className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif text-2xl text-dark-surface mb-2 font-normal">Order Placed</h3>
            <p className="label-caps text-primary mb-4">Kanch Digital Atelier</p>
            
            <p className="font-sans text-sm text-dark-surface/70 leading-relaxed mb-8">
              Thank you for acquiring these heirlooms. Your order is registered. Our boutique concierge will contact you shortly via email and SMS to coordinate delivery.
            </p>
            
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="bg-primary hover:bg-wine text-secondary text-xs uppercase tracking-caps py-3.5 px-8 transition-colors w-full font-semibold"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
