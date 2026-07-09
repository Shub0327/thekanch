import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Compass, BookOpen, Shield, Flame } from 'lucide-react';

export default function About() {
  const { hash } = useLocation();

  // Scroll to section if hash exists (e.g. #craftsmanship)
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="page-fade-in bg-canvas text-left">
      
      {/* 1. Brand Story / Header Banner */}
      <section className="relative py-[100px] bg-secondary border-b border-sandstone/25">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
          <span className="label-caps mb-3 block text-primary">Our Legacy</span>
          <h2 className="font-serif text-4xl md:text-6xl text-dark-surface max-w-2xl font-normal leading-[1.1] mb-6">
            A Silent Witness <br />To Legacies.
          </h2>
          <p className="font-sans text-sm md:text-base text-dark-surface/75 max-w-xl leading-relaxed">
            At Kanch Digital Atelier, we believe that jewellery should not be transient fashion. It should be a quiet vessel of history&mdash;handcrafted with precious detail to rest on your skin like heirlooms on silk.
          </p>
        </div>
      </section>

      {/* 2. Story Section with Image */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Story Text */}
        <div className="space-y-6">
          <span className="label-caps text-wine block">The Archives</span>
          <h3 className="font-serif text-2xl md:text-3xl text-dark-surface font-normal">Origins of The Atelier</h3>
          <p className="font-sans text-sm text-dark-surface/75 leading-relaxed">
            Founded with the vision to restore the slow, deliberate pace of traditional Indian jewellery design, Kanch Atelier is a tribute to the master craftsmen of Jaipur and Delhi. In an era of rapid mass-production, we champion the slow turning of a matte-paper magazine, and the deliberate care of handmade jewelry setting.
          </p>
          <p className="font-sans text-sm text-dark-surface/75 leading-relaxed">
            Every piece is curated with high-touch editorial focus. We source copper-based premium alloys, high-refraction moissanite gemstones, and real look Kundan to create artificial sets that replicate the exact weight, luster, and architectural detail of ancestral gold pieces.
          </p>
        </div>

        {/* Image */}
        <div className="aspect-[4/5] bg-secondary border border-sandstone/15 overflow-hidden">
          <img 
            src="https://miranajewels.com/cdn/shop/files/MJNK21N341-2.jpg?v=1738734289" 
            alt="Atelier Craftsmanship Details" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

      </section>

      {/* 3. Craftsmanship Section */}
      <section id="craftsmanship" className="bg-secondary border-y border-sandstone/25 py-[120px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
          
          <div className="text-center mb-[80px]">
            <span className="label-caps mb-3 block text-primary">The Process</span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark-surface">Traditional Karigari</h2>
            <div className="h-px bg-sandstone/30 w-16 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div className="space-y-4">
              <span className="font-serif text-3xl text-primary/50 block font-normal">01 / Setting</span>
              <h4 className="font-serif text-xl text-dark-surface font-semibold">Kundan Foil Work</h4>
              <p className="font-sans text-xs text-dark-surface/70 leading-relaxed">
                The intricate art of setting raw cut stones with a pure gold foil backing (Kundan). Our karigars follow ancient procedures to ensure every gemstone glows with brilliant depth and warmth.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <span className="font-serif text-3xl text-primary/50 block font-normal">02 / Finishes</span>
              <h4 className="font-serif text-xl text-dark-surface font-semibold">Antique Plating</h4>
              <p className="font-sans text-xs text-dark-surface/70 leading-relaxed">
                Using specialized multi-layered plating techniques, we achieve the precise warm, matte-gold finish of old jewelry, or the dark-toned Victorian plating that captures the vintage look.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <span className="font-serif text-3xl text-primary/50 block font-normal">03 / Assembly</span>
              <h4 className="font-serif text-xl text-dark-surface font-semibold">Piroi &amp; Beading</h4>
              <p className="font-sans text-xs text-dark-surface/70 leading-relaxed">
                Strung by hand using high-grade silk threads, each necklace set is balanced with semi-precious beads, natural pearls, and adjustable threads to drape comfortably over any collarbone.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Values Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-[80px] py-[120px]">
        <div className="text-center mb-[80px]">
          <span className="label-caps mb-3 block text-wine">Atelier Standards</span>
          <h2 className="font-serif text-3xl md:text-4xl text-dark-surface font-normal">Our Core Virtues</h2>
          <div className="h-px bg-sandstone/30 w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="border border-sandstone/25 p-8 flex flex-col justify-between h-[220px] bg-secondary/20">
            <Compass className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-serif text-lg text-dark-surface mb-2 font-normal">Uncompromised Style</h4>
              <p className="font-sans text-[11px] text-dark-surface/65 leading-normal">
                Curating designs that command attention through silence rather than noise. Minimalist luxury at its peak.
              </p>
            </div>
          </div>

          <div className="border border-sandstone/25 p-8 flex flex-col justify-between h-[220px] bg-secondary/20">
            <BookOpen className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-serif text-lg text-dark-surface mb-2 font-normal">Cultural Heritage</h4>
              <p className="font-sans text-[11px] text-dark-surface/65 leading-normal">
                Keeping the ancient practices of Indian jewelry setting alive in modern, accessible silhouettes.
              </p>
            </div>
          </div>

          <div className="border border-sandstone/25 p-8 flex flex-col justify-between h-[220px] bg-secondary/20">
            <Flame className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-serif text-lg text-dark-surface mb-2 font-normal">Fine Materials</h4>
              <p className="font-sans text-[11px] text-dark-surface/65 leading-normal">
                Copper-based alloys and verified glass-gemstones that ensure safety, long life, and weight of precious gold.
              </p>
            </div>
          </div>

          <div className="border border-sandstone/25 p-8 flex flex-col justify-between h-[220px] bg-secondary/20">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-serif text-lg text-dark-surface mb-2 font-normal">Absolute Trust</h4>
              <p className="font-sans text-[11px] text-dark-surface/65 leading-normal">
                Client relations based on prompt, transparent service, easy exchanges, and insured worldwide delivery.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
