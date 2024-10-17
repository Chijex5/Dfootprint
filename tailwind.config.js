/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#295255',   // Your primary color
        secondary: '#162623', // Your secondary color
        accent: '#577877',    // Your accent color
        background: '#F0F5F7', // Your background color
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'edu-auvic': ['Edu AUVIC WANTS Dots', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
