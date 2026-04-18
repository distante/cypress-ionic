import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';
import { convertToTestString } from '/test-helpers/test-helpers.js';

defineCustomElements(window).then(() => {
  /* Ionic is loaded! */

  document.querySelectorAll('ion-button.test-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      console.log('Button clicked!', event.target);
      event.target.innerText = convertToTestString(event.target.innerText);
    });
  });
});
