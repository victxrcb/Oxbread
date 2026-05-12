/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ox: {
          black:   '#080808',
          surface: '#111111',
          card:    '#181818',
          border:  '#242424',
          green:   '#1B6B1B',
          'green-hover': '#26962A',
          yellow:  '#F5C518',
          muted:   '#888888',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
