import { RangeValue } from '@ionic/core';
import { IonRange } from '@ionic/core/components/ion-range';
import { ionRangeCypress } from '@lib';

const selectorAndValues: Array<{
  selector: string;
  wantedValue: RangeValue;
  wantedLabel: string;
}> = [
  { selector: 'ion-range.regular', wantedValue: 70, wantedLabel: '70' },
  { selector: 'ion-range[step]', wantedValue: 70, wantedLabel: '70' },
  {
    selector: 'ion-range[dual-knobs]',
    wantedValue: { upper: 70, lower: -70 },
    wantedLabel: '-70/70',
  },
];

selectorAndValues.forEach((selectorAndValue) => {
  describe(selectorAndValue.selector, () => {
    beforeEach(() => {
      cy.visit('./');
    });

    it('can be changed by set value', () => {
      cy.get(selectorAndValue.selector).should((item$) => {
        expect(stringify((<IonRange>item$[0]).value)).not.to.eq(
          stringify(selectorAndValue.wantedValue)
        );
      });

      ionRangeCypress.setValue(
        selectorAndValue.selector,
        selectorAndValue.wantedValue
      );

      cy.get(selectorAndValue.selector).should((item$) => {
        expect(stringify((<IonRange>item$[0]).value)).to.eq(
          stringify(selectorAndValue.wantedValue)
        );
      });

      cy.get<IonRange>(selectorAndValue.selector).should((item$) => {
        const currentLabel = (<any>item$[0]).shadowRoot
          ?.querySelector('slot[name="end"]')
          .assignedNodes()[0].innerText;
        expect(currentLabel).to.eq(selectorAndValue.wantedLabel);
      });
    });

    it('can be changed by move value', () => {
      cy.get(selectorAndValue.selector).should((item$) => {
        expect(stringify((<IonRange>item$[0]).value)).not.to.eq(
          stringify(selectorAndValue.wantedValue)
        );
      });

      ionRangeCypress.moveToValue(
        selectorAndValue.selector,
        selectorAndValue.wantedValue
      );

      cy.get(selectorAndValue.selector).should((item$) => {
        expect(stringify((<IonRange>item$[0]).value)).to.eq(
          stringify(selectorAndValue.wantedValue)
        );
      });

      cy.get<IonRange>(selectorAndValue.selector).should((item$) => {
        const currentLabel = (<any>item$[0]).shadowRoot
          ?.querySelector('slot[name="end"]')
          .assignedNodes()[0].innerText;
        expect(currentLabel).to.eq(selectorAndValue.wantedLabel);
      });
    });
  });
});

function stringify(value: RangeValue): string {
  if (typeof value === 'number') {
    return value.toString();
  }

  const keys = Object.keys(value).sort() as Array<'upper' | 'lower'>;

  const obj: Record<string, number> = {};
  keys.forEach((key) => {
    obj[key] = value[key];
  });

  return JSON.stringify(obj);
}
