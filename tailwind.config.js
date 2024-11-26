/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2B5CE6',
        secondary: '#F5F5F7',
        'text-dark': '#1A1A1A',
        'accent-green': '#00B341',
        'border-light': '#E5E5E5',
      },
    },
  },
  plugins: [],
}
