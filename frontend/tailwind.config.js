/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vietnam: ['Be Vietnam Pro', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(1turn, #f9f5e9, transparent 86%)',
      },
    },
  },
  plugins: [],
}

