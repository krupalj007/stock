/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      cursor: {
        'no-drop': 'not-allowed',
      },
      fontWeight: {
        'bold-number': '700', // You can adjust the weight as needed
      },
      spacing: {
        '96':'420px',
        '5':'9px',
        '45':'480px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
