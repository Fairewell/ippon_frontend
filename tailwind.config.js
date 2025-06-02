/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js", 'node_modules/preline/dist/*.js',],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        'neumorph-light': '#e0e5ec',
        'neumorph-gray': '#b8bec9',
        'neumorph-white': '#ffffff',
      },
      boxShadow: {
        'neumorph': '8px 8px 16px #b8bec9, -8px -8px 16px #ffffff',
        'neumorph-inset': 'inset 4px 4px 8px #b8bec9, inset -4px -4px 8px #ffffff',
        'neumorph-button': '4px 4px 8px #b8bec9, -4px -4px 8px #ffffff',
        'neumorph-button-pressed': 'inset 4px 4px 8px #b8bec9, inset -4px -4px 8px #ffffff',
      }
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'html': {
          scrollBehavior: 'smooth',
        },
        'body': {
          backgroundColor: '#e0e5ec', // neumorph-light
          color: '#1f2937', // text-gray-800
          margin: '0',
          padding: '0',
        },
      });
    },
  ],
}