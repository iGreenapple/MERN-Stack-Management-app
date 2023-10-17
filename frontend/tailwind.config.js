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
        'light': '#F5F5F5',
        'dark': '#121212',
        'red': '#F05454',
        'navy': '#30475E',
        'grey': '#888888'
      },
      boxShadow: {
        '3xl': '15px 15px 20px -5px rgb(0 0 0 / 0.6), 5px 5px 5px -5px rgb(0 0 0 / 0.6)'
      }
    },
    fontFamily: {
      'header': ['Kanit', 'sans-serif']
    },
  },
  plugins: [
    
  ],
}

