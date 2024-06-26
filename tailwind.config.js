/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {

      colors: {
        'cblue': {
          100: '#404758',
          200: '#D7E1FF',
          300: '#7394D0',
          400: '#ACC6FF',
          500: '#1D212C',
          700: '#181C25',
          800: '#11131A',
        },
        'ctext': {
          100: '#DBE2F5',
          200: '#E3E1E6',
          300: '#BBBFC8',
          400: '#92949C',
          500: '#3F414A',
          600: '#022F66',
        },
        'cpurple': {
          400: '#E4B6E8',
          700: '#43274F'
        }
      },
      screens: {
        'xs': '500px'
      },
    },
  },
  plugins: [],
}