import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';

defineCustomElements(window).then(() => {
  const statusEl = document.getElementById('tab-click-status');

  document.querySelectorAll('ion-tab-bar').forEach((tabBar) => {
    tabBar.addEventListener('ionTabButtonClick', (event) => {
      statusEl.textContent = `clicked:${event.detail.tab}`;
    });
  });
});
