/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            100: "#e6f5d8",
            200: "#afe67f",
          },

          grayish: "#edefec", // soft gray
          pale: "#e6f5d8", // duplicate but you can name it different
        },
      },
    },
  },
  
  plugins: [],
};
