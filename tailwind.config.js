/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.html', './client/**/*.js'], // Update this to match all relevant files
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'], // This sets Noto Sans as the default sans-serif font
      },
    },
  },
  plugins: [],
}
