/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9FD',
        surface: '#FFFFFF',
        'surface-subtle': '#F4F2FA',
        'surface-card': 'rgba(255, 255, 255, 0.85)',
        text: {
          primary: '#171522',
          secondary: '#6F6B7D',
          muted: '#948FA3',
          light: '#EDE7FF',
        },
        brand: {
          DEFAULT: '#7657E8',
          hover: '#6845DF',
          light: '#EDE7FF',
          accent: '#9B7BF7',
          deep: '#4C3A91',
          gradientStart: '#7657E8',
          gradientEnd: '#B18CFE',
        },
        accent: {
          blue: '#5D6FEF',
          teal: '#20B486',
          amber: '#E5A62B',
          rose: '#E85D75',
        },
        border: {
          subtle: 'rgba(118, 87, 232, 0.12)',
          highlight: 'rgba(155, 123, 247, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwriting: ['Caveat', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(118, 87, 232, 0.15)',
        'glow-md': '0 4px 30px rgba(118, 87, 232, 0.22)',
        'glow-lg': '0 8px 45px rgba(118, 87, 232, 0.3)',
        'card-subtle': '0 10px 30px -5px rgba(23, 21, 34, 0.05)',
        'card-hover': '0 20px 40px -10px rgba(118, 87, 232, 0.18)',
        'inner-glow': 'inset 0 0 15px rgba(155, 123, 247, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
