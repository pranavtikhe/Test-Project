/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{vue,js}'],
  mode:'jit',
  theme: {
    extend: {},
  },
   plugins: [],
  corePlugins: {
    preflight: false,
  }
}
