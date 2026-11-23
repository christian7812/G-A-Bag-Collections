/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#E5E0D8',
          300: '#D5C6B3',
          400: '#A39281',
          500: '#1A1A1A',
          600: '#111827',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        brand: {
          pink: '#1A1A1A',           // Replaced pink with Luxury Charcoal / Black
          'pink-dark': '#000000',    // Pure Black
          'pink-light': '#2A2A2A',   // Charcoal
          'pink-soft': '#F5F2EB',    // Warm Studio Sand
          'pink-subtle': '#EFECE6',  // Mastle Masthead Beige
          accent: '#1A1A1A',         // Luxury Accent
          'accent-dark': '#000000',
          'accent-light': '#2A2A2A',
          soft: '#F5F2EB',
          sand: '#D5C6B3',
          beige: '#EFECE6',
          bg: '#FAF8F5',
          'bg-subtle': '#FFFFFF',
          charcoal: '#1A1A1A',
          muted: '#6B7280',
          border: '#E5E0D8',
          deal: '#1A1A1A',           
          orange: '#C5A880',         
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(225, 29, 72, 0.08)',
        'luxury': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 4px rgba(0, 0, 0, 0.06)',
        'jumia': '0 2px 8px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
