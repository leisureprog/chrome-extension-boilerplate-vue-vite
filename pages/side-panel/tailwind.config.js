import baseConfig from '@extension/tailwindcss-config';
export default {
    ...baseConfig,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
