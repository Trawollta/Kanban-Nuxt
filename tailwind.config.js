/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Dark Mode über eine Klasse aktivieren
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A', // Primärfarbe im hellen Modus
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        },
        cool: { // Das umbenannte "gray" als "cool" für deine App
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0a0e12'
        }
      }
    }
  },
  plugins: [],
};
