import { setupConfig } from '/node_modules/@ionic/core/dist/esm/index.js';
import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';
import { convertToTestString } from '/test-helpers/test-helpers.js';

setupConfig({
  mode: 'md',
});
defineCustomElements(window).then(() => {
  /* Ionic is loaded! */

  document.querySelector('ion-button').addEventListener('click', (event) => {
    event.target.innerText = convertToTestString(event.target.innerText);
  });
});
