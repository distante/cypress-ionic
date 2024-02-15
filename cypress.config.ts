import { defineConfig } from 'cypress';

export default defineConfig({
  includeShadowDom: true,
  projectId: '1tfaog',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'http://localhost:3999/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
