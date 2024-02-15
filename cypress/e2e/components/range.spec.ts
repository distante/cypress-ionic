import { RangeValue } from '@ionic/core';
import { IonRange } from '@ionic/core/components/ion-range';
import { ionRangeCypress } from '@lib';

function getIonRangeEndSlotElements(selector: string) {
  return cy
    .get<IonRange>(selector)
    .shadow()
    .find<HTMLSlotElement>('slot[name="end"]')
    .then(($slot) => $slot[0].assignedElements());
}

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

describe('using valid valid ranges', () => {
  beforeEach(() => {
    cy.visit('./');
  });

  selectorAndValues.forEach((selectorAndValue) => {
    describe(selectorAndValue.selector, () => {
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

        getIonRangeEndSlotElements(selectorAndValue.selector).contains(
          selectorAndValue.wantedLabel
        );
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

        getIonRangeEndSlotElements(selectorAndValue.selector).contains(
          selectorAndValue.wantedLabel
        );
      });
    });
  });
});

describe('using it to values beyond their supported max/min does not hangs', () => {
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

  beforeEach(() => {
    cy.visit('./');
  });

  outOfRangeValues.forEach((selectorAndValue) => {
    describe(`${selectorAndValue.selector}, target: ${stringify(
      selectorAndValue.outOfRangeValue
    )}`, () => {
      it(`move`, () => {
        ionRangeCypress.setValue(
          selectorAndValue.selector,
          selectorAndValue.initialValue
        );
        cy.get(selectorAndValue.selector)
          .then(($item) => {
            return cy.wrap(stringify((<IonRange>$item[0]).value));
          })
          .should(
            'not.eq', // Correct Initial State,
            stringify(selectorAndValue.wantedValue)
          );

        ionRangeCypress.moveToValue(selectorAndValue.selector, {
          targetValue: selectorAndValue.outOfRangeValue,
        }); // Move to wrong target

        // Should set correct value
        cy.get(selectorAndValue.selector)
          .then((item$) => {
            return cy.wrap(stringify((<IonRange>item$[0]).value));
          })
          .should('eq', stringify(selectorAndValue.wantedValue));

        getIonRangeEndSlotElements(selectorAndValue.selector).contains(
          selectorAndValue.wantedLabel
        );
      });

      it(`setValue`, () => {
        ionRangeCypress.setValue(
          selectorAndValue.selector,
          selectorAndValue.initialValue
        );
        cy.get(selectorAndValue.selector)
          .then(($item) => {
            return cy.wrap(stringify((<IonRange>$item[0]).value));
          })
          .should(
            'not.eq', // Correct Initial State,
            stringify(selectorAndValue.wantedValue)
          );

        ionRangeCypress.setValue(
          selectorAndValue.selector,
          selectorAndValue.outOfRangeValue
        ); // set wrong target

        // Should set correct value
        cy.get(selectorAndValue.selector)
          .then((item$) => {
            return cy.wrap(stringify((<IonRange>item$[0]).value));
          })
          .should('eq', stringify(selectorAndValue.wantedValue));

        getIonRangeEndSlotElements(selectorAndValue.selector).contains(
          selectorAndValue.wantedLabel
        );
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
