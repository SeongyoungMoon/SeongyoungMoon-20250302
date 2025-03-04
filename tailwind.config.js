module.exports = {
  content: [
    "tailwind.config.ts",
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/deals/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'size-12': ['0.75rem', '1.05rem'],
        'size-14': ['0.875rem', '1.225rem'],
        'size-16': ['1rem', '1.4rem'],
        'size-18': ['1.125rem', '1.575rem'],
        'size-20': ['1.25rem', '1.75rem'],
      },
      colors: {
        White: '#FFFFFF',
        Black: "#000000",
        GR: {
          50: '#EEEFF3',
          100: '#EEEFF3',
          300: '#BCBDC3',
          400: '#9C9DA4',
        },
        R: {
          500: '#F8323E',
          50: '#FFEDEE',
        },
        O: {
          500: '#FF6231',
          300: '#FFA98E',
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
  safelist: [
    {
      pattern:
        /bg-(GR|O|R|White|Black)-(50|100|300|400|500)/,
    },
    {
      pattern:
        /text-(GR|O|R|White|Black)-(50|100|300|400|500)/,
    },
  ],
};
