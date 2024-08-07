module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#bdd6ff',
          200: '#94bcff',
          300: '#6ba2ff',
          400: '#4288ff',
          500: '#196eff',
          600: '#0055e6',
          700: '#0041b3',
          800: '#002d80',
          900: '#00194d',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}