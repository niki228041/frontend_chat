/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'monocode': ['monocode', 'monospace'], // Add custom font to Tailwind
        'monocode_semibold': ['monocode_semibold', 'sans-serif'], // Add custom semibold font
      },
      boxShadow: {
        '3xl': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
      },
      colors: {
        'kinda_gray': '#0E0E0E', // Add the color with proper hex format
      },
    },
  },
  plugins: [],
}

