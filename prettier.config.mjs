// @ts-nocheck
import styleguide from '@vercel/style-guide/prettier';

const config = {
  ...styleguide,
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};

export default config;
