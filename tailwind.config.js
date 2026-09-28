export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bark: 'var(--bark)', mahogany: 'var(--mahogany)', burgundy: 'var(--burgundy)',
        ember: 'var(--ember)', gold: 'var(--gold)', amber: 'var(--amber)', cream: 'var(--cream)',
      },
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
