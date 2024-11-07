/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 기본 sans-serif 폰트를 NeoDunggeunmo Pro로 변경
        sans: [
          'NeoDunggeunmo Pro',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        violet: {
          50: '#EBE9FF',
          100: '#DAD7FF',
          200: '#BEB6FF',
          300: '#9C8BFF',
          400: '#855DFF',
          500: '#7A38FF',
          600: '#7816FF',
          700: '#710CF6',
          800: '#5B0DC6',
          900: '#49159A',
          950: '#200940',
        },
        halfbaked: {
          50: '#F0FAFB',
          100: '#D9F2F4',
          200: '#B8E5E9',
          300: '#84D0D9',
          400: '#4EB4C2',
          500: '#3298A8',
          600: '#2C7C8E',
          700: '#2A6574',
          800: '#2A5460',
          900: '#274652',
          950: '#152D37',
        },
        eastbay: {
          50: '#F4F7FA',
          100: '#E5EBF4',
          200: '#D2DDEB',
          300: '#B2C7DE',
          400: '#8DA9CD',
          500: '#728EBF',
          600: '#5F78B1',
          700: '#5467A1',
          800: '#495684',
          900: '#434F73',
          950: '#292F42',
        },
        chartreuseyellow: {
          50: '#FFFFE5',
          100: '#FEFFC6',
          200: '#FAFF94',
          300: '#F2FF56',
          400: '#E2F724',
          500: '#D7F205',
          600: '#99B100',
          700: '#728605',
          800: '#5B6A0A',
          900: '#4B590E',
          950: '#283201',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-sm': {
          color: '#EBE9FF',
          'text-shadow': `-1px -1px 0 #200940,1px -1px 0 #200940,-1px 1px 0 #200940,1px 1px 0 #200940,-1px 0 0 #200940,1px 0 0 #200940,0 -1px 0 #200940,0 1px 0 #200940,0 0 1px #200940`,
        },
        '.text-stroke-md': {
          color: '#EBE9FF',
          'text-shadow': `2px 0 0 #200940,-2px 0 0 #200940,0 2px 0 #200940,0 -2px 0 #200940,1px 1px #200940,-1px -1px 0 #200940,1px -1px 0 #200940,-1px 1px 0 #200940`,
        },
      });
    },
  ],
};
