/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': {transform: 'rotate(0.0deg)'},
          '10%': {transform: 'rotate(14deg)'},
          '20%': {transform: 'rotate(-8deg)'},
          '30%': {transform: 'rotate(14deg)'},
          '40%': {transform: 'rotate(-4deg)'},
          '50%': {transform: 'rotate(10.0deg)'},
          '60%': {transform: 'rotate(0.0deg)'},
          '100%': {transform: 'rotate(0.0deg)'}
        }
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite'
      },
      colors: {
        thickmint: '#7ab5b5',
        mint: '#5CD1E5',
        lightmint: '#E6FFFF'
      },
      screens: {
        xl: {max: '1279px'},
        // => @media (max-width: 1279px) { ... }

        lg: {max: '1023px'},
        // => @media (max-width: 1023px) { ... }

        md: {max: '767px'},
        // => @media (max-width: 767px) { ... }

        sm: {max: '639px'}
        // => @media (max-width: 639px) { ... }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
