/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Royal Gold
          dark: '#BCA040',    // Antique Gold
        },
        secondary: {
          DEFAULT: '#F5ECE1', // Muted Cream Champagne
        },
        canvas: '#FCF9F5',    // Warm Alabaster Beige
        sandstone: '#E5D9C8', // Champagne Bronze
        emerald: {
          DEFAULT: '#153A2D', // Deep royal emerald
          light: '#235946',
        },
        wine: {
          DEFAULT: '#B35B6D', // Royal Velvet Rose
          light: '#DCA4B0',   // Soft Blush Pink
        },
        'dark-surface': '#221614', // Deep Espresso/Mahogany primary text
        'surface-dim': '#7A6A66',   // Warm Rose-taupe muted text
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        caps: '0.2em',
        tightest: '-0.02em',
      },
      spacing: {
        'desktop-margin': '80px',
        'mobile-margin': '24px',
        'section-gap': '120px',
        'stack-sm': '12px',
        'stack-md': '24px',
        'stack-lg': '48px',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
}
