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
          soft: '#F8BBD0',
          accent: '#E91E63',
          'accent-dark': '#C2185B',
          'accent-light': '#F48FB1',
          bg: '#FFF7FA',
          'bg-subtle': '#FDF2F7',
          charcoal: '#292329',
          muted: '#6E616B',
          border: '#F3D2DF',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
