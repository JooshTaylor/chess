/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-black': 'rgb(180,136,97)',
        'chess-white': 'rgb(239,217,180)'
      }
    },
  },
  plugins: []
}