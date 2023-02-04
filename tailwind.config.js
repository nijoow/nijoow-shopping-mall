/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: { texture: 'url(/texture.png)' },
      fontFamily: {
        Insomnia: 'Insomnia',
      },
      colors: {
        brown: '#6F5643',
        orange: '#CC6B49',
        ocher: '#D2A24C',
        beige: '#ECE6C2',
        mint: '#73BDA8',
      },
    },
  },
  plugins: [],
};
