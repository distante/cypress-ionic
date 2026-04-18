import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';

defineCustomElements(window).then(() => {
  const statusEl = document.getElementById('tab-click-status');

  document
    .querySelector('ion-tab-bar')
    .addEventListener('ionTabButtonClick', (event) => {
      statusEl.textContent = `clicked:${event.detail.tab}`;
    });
});
