import { IonRange } from '@ionic/core/components/ion-range';
import { RangeValue } from '@ionic/core/dist/types/interface';

function setValue(ionCssSelector: string, value: RangeValue) {
  return cy.get(ionCssSelector).then((ionRange$) => {
    const ionRange = ionRange$[0] as IonRange;
    ionRange.value = value;
    const event = new CustomEvent('ionChange', { detail: value });
    ionRange.dispatchEvent(event);
  });
}

export const ionRangeCypress = { setValue };
