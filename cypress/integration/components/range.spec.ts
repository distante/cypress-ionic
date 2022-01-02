import { RangeValue } from '@ionic/core';
import { IonRange } from '@ionic/core/components/ion-range';
import { ionRangeCypress } from '@lib';

const selectorAndValues: Array<{
  selector: string;
  wantedValue: RangeValue;
  wantedLabel: string;
}> = [
  { selector: 'ion-range.regular', wantedValue: 60, wantedLabel: '60' },
  { selector: 'ion-range[step]', wantedValue: 60, wantedLabel: '60' },
  {
    selector: 'ion-range[dual-knobs]',
    wantedValue: { upper: 60, lower: -60 },
    wantedLabel: '-60/60',
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

      ionRangeCypress.moveToValue(selectorAndValue.selector, {
        targetValue: selectorAndValue.wantedValue,
      });

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

describe('moving it to values beyond their supported value does not hangs', () => {
  const outOfRangeValues: Array<{
    selector: string;
    wantedValue: RangeValue;
    wantedLabel: string;
    initialValue: RangeValue;
    outOfRangeValue: RangeValue;
  }> = [
    {
      selector: 'ion-range.regular',
      outOfRangeValue: 110,
      wantedValue: 100,
      wantedLabel: '100',
      initialValue: 90,
    },
    {
      selector: 'ion-range.regular',
      outOfRangeValue: -110,
      wantedValue: -100,
      wantedLabel: '-100',
      initialValue: -95,
    },
    {
      selector: 'ion-range[step]',
      outOfRangeValue: 110,
      wantedValue: 100,
      wantedLabel: '100',
      initialValue: 90,
    },
    {
      selector: 'ion-range[step]',
      outOfRangeValue: -110,
      wantedValue: -100,
      wantedLabel: '-100',
      initialValue: -90,
    },
    {
      selector: 'ion-range[dual-knobs]',
      outOfRangeValue: { upper: 110, lower: -110 },
      wantedValue: { upper: 100, lower: -100 },
      wantedLabel: '-100/100',
      initialValue: { upper: 90, lower: -90 },
    },
  ];

  outOfRangeValues.forEach((selectorAndValue) => {
    beforeEach(() => {
      cy.visit('./');
    });

    it(selectorAndValue.selector, () => {
      ionRangeCypress.setValue(
        selectorAndValue.selector,
        selectorAndValue.initialValue
      );
      cy.get(selectorAndValue.selector).should((item$) => {
        expect(stringify((<IonRange>item$[0]).value)).not.to.eq(
          stringify(selectorAndValue.wantedValue)
        );
      }); // Correct Initial State,

      ionRangeCypress.moveToValue(selectorAndValue.selector, {
        targetValue: selectorAndValue.outOfRangeValue,
      }); // Move to wrong target

      // Should call this
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
