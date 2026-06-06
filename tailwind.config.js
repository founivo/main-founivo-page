/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'], // Custom font family for Syne
      },
      colors: {
        // You can define your custom colors here if needed,
        // but for now, the inline styles handle it.
        // Example: 'primary-green': '#0F6E56',
      }
    },
  },
  plugins: [],
};