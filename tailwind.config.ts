/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: 'var(--blue)',
          dark: 'var(--blue-dark)'
        },
        purple: {
          DEFAULT: 'var(--purple)',
          dark: 'var(--purple-dark)'
        },
        danger: 'var(--danger)',
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)'
        }
      }
    }
  },
  plugins: []
}
