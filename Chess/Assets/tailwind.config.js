/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-dark': 'rgb(180,136,97)',
        'chess-light': 'rgb(239,217,180)'
      }
    },
  },
  plugins: [],
}