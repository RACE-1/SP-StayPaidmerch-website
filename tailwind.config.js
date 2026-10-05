/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0D12',
        champagne: '#C9A84C',
        ivory: '#FAF8F5',
        slateDark: '#2A2A35',
        surface: '#16161F',
        surfaceBorder: 'rgba(255, 255, 255, 0.08)'
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      }
    },
  },
  plugins: [],
}
