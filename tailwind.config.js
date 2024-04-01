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
          400: '#ACC6FF',
          500: '#1D212C',
          700: '#181C25',
          800: '#11131A',
        },
        'ctext': {
          50: '#FFFFFD',
          100: '#DBE2F5',
          200: '#DFDEE5',
          300: '#BBBFC8'
        }
      },
    },
  },
  plugins: [],
}