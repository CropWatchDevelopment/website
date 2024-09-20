/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  preflight: false,
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Disable the 'collapse' utility
    collapse: false,
  },
}

