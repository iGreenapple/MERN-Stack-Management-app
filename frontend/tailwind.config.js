/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        light: "#EAEAEA",
        dark: "#252A34",
        red: "#FF2E63",
        navy: "#08D9D6",
        mediumgrey: "#888888",
        lightgrey: "#aeaeae"
      },
      boxShadow: {
        "3xl": "15px 15px 20px -5px rgb(0 0 0 / 0.6), 5px 5px 5px -5px rgb(0 0 0 / 0.6)",
      },
    },
    fontFamily: {
      header: ["Kanit", "sans-serif"],
    },
  },
  plugins: [],
};
