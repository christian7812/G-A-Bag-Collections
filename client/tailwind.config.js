/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#BE123C',         // Deep luxury rose pink
          'pink-dark': '#881337',    // Rich dark rose / berry
          'pink-light': '#E11D48',   // Medium vibrant rose
          'pink-soft': '#FFF1F2',    // Subtle soft blush
          'pink-subtle': '#FFE4E6',  // Light rose highlight
          accent: '#BE123C',         // Deep rose accent
          'accent-dark': '#881337',
          'accent-light': '#E11D48',
          soft: '#FFE4E6',
          bg: '#F8F9FB',             // Clean modern marketplace background
          'bg-subtle': '#FFFFFF',    // Pure white cards
          charcoal: '#1F2937',       // Crisp readable dark text
          muted: '#6B7280',
          border: '#E5E7EB',
          deal: '#BE123C',           
          orange: '#F97316',         
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
