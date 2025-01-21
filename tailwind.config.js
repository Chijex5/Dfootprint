/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{html,js,jsx,ts,tsx,css}',
  ],
  darkMode: "class", // Enable dark mode with the "class" strategy
  theme: {
    extend: {
      colors: {
        primary: '#295255',   // Light mode primary color
        secondary: '#162623', // Light mode secondary color
        accent: '#577877',    // Light mode accent color
        background: '#F0F5F7', // Light mode background color
        darkPrimary: '#88C0D0', // Dark mode primary color
        darkSecondary: '#2E3440', // Dark mode secondary color
        darkAccent: '#5E81AC',   // Dark mode accent color
        darkBackground: '#1E1E2E', // Dark mode background color
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'edu-auvic': ['Edu AUVIC WANTS Dots', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        bounce: "bounce 1.5s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-50px) scale(1)" },
          "50%": { transform: "translateY(-60px) scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
