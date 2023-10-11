/** @type {import('tailwindcss').Config} */
module.exports =  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'white': '#F5F5F5',
        'red': '#F05454',
        'navy': '#30475E',
        'black': '#121212'
      }
    },
    fontFamily: {
      'header': ['Kanit', 'sans-serif']
    },
  },
  plugins: [],
}

