/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'], // Make sure this matches the files where you want Tailwind to apply
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'], // This sets Noto Sans as the default sans-serif font
      },
    },
  },
}