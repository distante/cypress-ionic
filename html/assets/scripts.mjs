import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';
import { convertToTestString } from '/test-helpers/test-helpers.js';

defineCustomElements(window).then(() => {
  /* Ionic is loaded! */

  document.querySelector('ion-button').addEventListener('click', (event) => {
    event.target.innerText = convertToTestString(event.target.innerText);
  });

  document.querySelector('.ion-range-dual ion-range').value = {
    lower: -50,
    upper: 50,
  };

  // ------ ION RANGE ----- //
  const ranges = document.querySelectorAll('ion-range');
  const rangesIntervals = new Array(ranges.length);
  document.querySelectorAll('ion-range').forEach((ionRange, i) => {
    ionRange.addEventListener('ionChange', (event) => {
      clearInterval(rangesIntervals[i]);
      const targetIonRange = event.target;

      rangesIntervals[i] = setInterval(() => {
        const slot =
          targetIonRange.shadowRoot.querySelector('slot[name="end"]');
        if (!slot) {
          return;
        }

        clearInterval(rangesIntervals[i]);
        rangesIntervals[i] = undefined;

        let value = ionRange.value;

        if (typeof value === 'object') {
          value = `${ionRange.value.lower}/${ionRange.value.upper}`;
        }

        slot.assignedNodes()[0].innerText = value;
      }, 100);
    });
  });
});
