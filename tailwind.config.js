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
          DEFAULT: '#B08D57', // Antique Gold
          dark: '#967645',
        },
        secondary: {
          DEFAULT: '#F8F5F0', // Ivory Base
        },
        canvas: '#FCF9F8', // Main Page Background
        sandstone: '#D9C7B3', // Tertiary Sandstone
        emerald: {
          DEFAULT: '#2F5D50',
          light: '#3C7061',
        },
        wine: {
          DEFAULT: '#6B2334',
          light: '#802D40',
        },
        'dark-surface': '#1C1B1B',
        'surface-dim': '#DCD9D9',
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
