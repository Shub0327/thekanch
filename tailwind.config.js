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
          dark: '#AA8C2C',
        },
        secondary: {
          DEFAULT: '#1C1514', // Elevated dark mahogany for cards
        },
        canvas: '#120E0D', // Deep midnight mahogany / onyx
        sandstone: '#332624', // Subtle bronze/brown border
        emerald: {
          DEFAULT: '#153A2D', // Deep royal emerald
          light: '#235946',
        },
        wine: {
          DEFAULT: '#8B1C31', // Ruby Crimson for badges
          light: '#A4233C',
        },
        'dark-surface': '#FDFBF7', // Pearl Ivory for primary text
        'surface-dim': '#B3ACA2', // Muted gold-grey for secondary text
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
