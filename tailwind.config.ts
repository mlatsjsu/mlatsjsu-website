import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      lg: '1176px',
    },
    colors: {
      light: {
        primary: 'rgb(var(--color-light-primary))',
        secondary: 'rgb(var(--color-light-secondary))',
        background: 'rgb(var(--color-light-background))',
        text: 'rgb(var(--color-light-text))',
        neutral: {
          dark: 'rgb(var(--color-light-neutral-dark))',
          gray: 'rgb(var(--color-light-neutral-gray))',
          white: 'rgb(var(--color-light-neutral-white))',
        },
        link: 'rgb(var(--color-light-link))',
      },
    },
    borderRadius: {
      sm: '11px',
      md: '22px',
      lg: '44px',
      none: '0',
    },
    borderWidth: {
      'line-width': '2.5px',
    },
    fontSize: {
      'h1-mobile-lg': [
        '2rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h1-mobile-sm': [
        '1.476rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h2-mobile': [
        '1.383rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h3-mobile': [
        '1.296rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h4-mobile': [
        '1.215rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h5-mobile': [
        '1.139rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 400 },
      ],
      'h6-mobile': [
        '1.067rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 400 },
      ],
      'h1-desktop-lg': [
        '4.5rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h1-desktop-sm': [
        '2.988rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h2-desktop': [
        '2.488rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h3-desktop': [
        '2.074rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h4-desktop': [
        '1.728rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 700 },
      ],
      'h5-desktop': [
        '1.44rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 400 },
      ],
      'h6-desktop': [
        '1.2rem',
        { lineHeight: '1.15em', letterSpacing: '-0.02em', fontWeight: 400 },
      ],
      button: [
        '1rem',
        { lineHeight: '1.6em', letterSpacing: '-0.02em', fontWeight: 500 },
      ],
      p: ['1rem', { lineHeight: '1.6em', fontWeight: 400 }],
      'small-lg': ['0.831rem', { lineHeight: '1.6em', fontWeight: 400 }],
      'small-lg-bold': ['0.831rem', { lineHeight: '1.6em', fontWeight: 700 }],
      'small-sm': ['0.694rem', { lineHeight: '1.6em', fontWeight: 400 }],
      'small-sm-bold': ['0.694rem', { lineHeight: '1.6em', fontWeight: 700 }],
    },
    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '4rem',
        desktop: '1176px',
        'line-width': '2.5px',
        'line-mobile': '32px',
        'line-desktop': '112px',
      },
    },
  },
  plugins: [],
};
export default config;
