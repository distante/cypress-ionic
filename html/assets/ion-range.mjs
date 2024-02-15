import { defineCustomElements } from '/node_modules/@ionic/core/dist/esm/loader.js';
import { convertToTestString } from '/test-helpers/test-helpers.js';

defineCustomElements(window).then(() => {
  /* Ionic is loaded! */

  // ------ ION RANGE ----- //
  const ranges = document.querySelectorAll('ion-range');
  const rangesIntervals = new Array(ranges.length);
  document.querySelectorAll('ion-range').forEach((ionRange, i) => {
    ionRange.addEventListener('ionChange', (event) => {
      console.log('ionRange ionChange event', event);
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

        let eventValue = event.detail.value;

        if (typeof eventValue === 'object') {
          eventValue = `${eventValue.lower}/${eventValue.upper}`;
        }

        slot.assignedNodes()[0].innerText = eventValue;
      }, 100);
    });
  });
});
