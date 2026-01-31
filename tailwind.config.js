/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Santa Marta Travel Guide palette
        santa: {
          cream: '#F8F8F8',
          teal: '#1D6B6B',       // primary brand (SANTA MARTA)
          tealLight: '#3D9197',
          tealPale: '#5AC4C2',
          orange: '#E68B3E',    // accent (THE, TRAVEL GUIDE)
          orangeLight: '#FCE2B3',
          sand: '#F9D072',
          sky: '#FDD792',
          forest: '#377E5E',
          olive: '#5E8F6C',
          palm: '#2A6E4F',
          terracotta: '#C9724C',
          earth: '#A36B40',
          trunk: '#A86A45',
        },
        primary: {
          50: '#e8f4f4',
          100: '#c5e3e3',
          200: '#9ed1d1',
          300: '#77bfbf',
          400: '#5ab2b2',
          500: '#1D6B6B',
          600: '#1a6060',
          700: '#155555',
          800: '#114a4a',
          900: '#0a3939',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}





