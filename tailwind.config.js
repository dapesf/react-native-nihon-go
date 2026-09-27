/** @type {import('tailwindcss').Config} */
const { APP_COLORS } = require('./src/shared/constants/colors');

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: APP_COLORS
    },
  },
  plugins: [],
}