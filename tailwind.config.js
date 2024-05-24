/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        content: "#4A5660", // Text Color
        disable: "#9BA8B8", // Disabled Color
        customBlue: "#00A3FF",
        customLightBlue: "#F0F7FF",

      },
    },
  },
  plugins: [],
}

