/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f5ff',
          100: '#e3ebff',
          200: '#c7d6ff',
          300: '#a4baff',
          400: '#7e98ff',
          500: '#5e78ff',
          600: '#4159f6',
          700: '#3447c4',
          800: '#2a3aa1',
          900: '#242f82'
        }
      }
    },
  },
  plugins: [],
};

