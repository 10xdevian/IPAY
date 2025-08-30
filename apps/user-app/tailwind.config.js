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

        "custom-start": "rgba(2, 0, 36, 1)", // 0%
        "custom-mid": "rgba(9, 9, 121, 1)", // ~21% (Tailwind supports only one via)
        "custom-end": "rgba(5, 108, 186, 1)", // 100%
        // rgba(0, 212, 255, 1) is the same stop as end; ignored unless you use multiple `to-` colors
      },
    },
  },

  plugins: [],
};
