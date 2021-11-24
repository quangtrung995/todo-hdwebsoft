module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mytext: 'var(--text-color)',
        myblue: 'var(--blue)',
        mybluelight: 'var(--bluelight)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
