/** @type {import('tailwindcss').Config} */


export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pricedown: ['Pricedown', 'sans-serif'],
      },
      colors: {
        blue: {
          'primary-bg': '#0284c7',       // Deep blue for background to ensure readability
          'secondary-bg': '#0ea5e9',     // Lighter blue for sections, good contrast with text
          'highlight': '#60A5FA',        // Bright blue for call-to-action elements
          'overlay': 'rgba(15,23,42,.5)', // Blue overlay for contrast

          'text-light': '#082f49',       // Light blue text color, readable on dark backgrounds
          'text-blue': '#93c5fd',        // Darker blue text color, good on lighter backgrounds
          'text-dark': '#06b6d4',        // Very dark blue for text on light backgrounds
           
          'accent': '#d8b4fe',           // Accents in bright blue
          'muted': '#BFDBFE',            // Muted light blue for less prominent text
          'success': '#34D399',          // Green for success messages
          'error': '#F87171',            // Red for error messages
        },
        dark: {
          'primary-bg': '#0F172A',       // Darker background for a sleek look
          'secondary-bg': '#1E293B',     // Slightly lighter dark color for sections
          'highlight': '#3B82F6',        // Vibrant blue for highlights and calls-to-action
          'overlay': 'rgba(15, 23, 42, 0.5)', // Dark overlay for contrast

          'text-light': '#f59e0b',       // Light blue text color for readability on dark backgrounds
          'text-blue': '#bae22b',        // Light blue for text
          'text-dark': '#eee8aa',        // Dark text color for light backgrounds
          'accent': '#98FF98',           // Bright blue for accents

          'muted': '#D3D3D3',            // Muted grayish blue for less important text
          'success': '#48BB78',          // Green color for success messages
          'error': '#F87171',            // Red color for error messages
        },
      },
      backgroundImage: {
        'hero-pattern': 'url("./assets/images/CrisFormage-GTAV.png")',
        'footer-texture': 'url("./assets/images/footer-texture.png")',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        },

      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
        bounce: 'bounce 1s infinite',
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(237, 137, 54, 0.5)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
