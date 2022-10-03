import { defineConfig } from 'cypress'
import {addMatchImageSnapshotPlugin} from 'cypress-image-snapshot/plugin';

export default defineConfig({
  viewportWidth: 1600,
  viewportHeight: 960,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    experimentalSessionAndOrigin:true,
    specPattern: 'cypress/e2e/**/*.spec.ts',
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);    
    },
  }
})


