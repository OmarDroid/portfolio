/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#6366f1',  // Indigo
          500: '#4f46e5',  // Slightly darker indigo
          600: '#4338ca',  // Even darker indigo
        },
        secondary: {
          400: '#60a5fa',  // Blue
          500: '#3b82f6',  // Slightly darker blue
          600: '#2563eb',  // Even darker blue
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}