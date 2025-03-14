import type { Config } from 'tailwindcss/types/config'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#2678f0',
        secondary: '#185bc0',
      }
    },
  },
  plugins: [],
} as Omit<Config, 'content'>
