/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "main": ['Signika', 'sans-serif'],
        "marker": ['Permanent Marker', 'cursive'],
        "title": ['Abril Fatface', 'cursive']
      }
    },
  },
  plugins: [],
}