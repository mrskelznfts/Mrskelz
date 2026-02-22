/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        vintage: ["Bros Pops", "Limelight", "serif"],
        display: ["Bros Pops", "Bowlby One SC", "cursive"],
      },
      colors: {
        lavender: "#7A6B7A",
        burgundy: "#5D2A42",
        beige: "#F5E6BE",
        gold: "#D4AF37",
        "neon-pink": "#FF1493",
        "plum-dark": "#1a0f1f",
        "off-white": "#FAF9F6",
        "neon-lavender": "#E6E6FA",
      },
    },
  },
  plugins: [],
}
