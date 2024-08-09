/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{vue,js}'],
  darkMode: "class",
  mode:'jit',
  theme: {
    extend: {},
  },
   plugins: [],
  corePlugins: {
    preflight: false,
  }
}
