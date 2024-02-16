import { ionInputCypress } from '@lib';
import * as testHelpers from '../../../test-helpers/test-helpers.js';

describe('Ion Input', () => {
  const selectors = [
    '.external-label ion-input',
    '.internal-label ion-input',
    '.internal-label ion-input',
    '.internal-aria-label ion-input',
  ];

  selectors.forEach((selector) => {
    describe(selector, () => {
      beforeEach(() => {
        cy.visit('./ion-input.html');
      });

      it('can be written on by string selector', () => {
        cy.get(`${selector}.hydrated`)
          .first()
          .then(($ionInput) => {
            const element = $ionInput[0];
            const wantedText = testHelpers.convertToTestString(
              element.innerText
            );

            ionInputCypress.write(selector, wantedText).then(() => {
              const inputElement = element.querySelector('input')?.value;

              expect(inputElement).to.eq(wantedText);
            });
          });
      });

      it('can be cleared', () => {
        cy.get(`${selector}.hydrated`)
          .first()
          .then(($ionInput) => {
            const element = $ionInput[0];

            ionInputCypress
              .write(selector, 'i am not clear here :)')
              .then(() => {
                return ionInputCypress.clear(selector);
              })
              .then(() => {
                const inputElement = element.querySelector('input')?.value;

                expect(inputElement).to.eq('');
              });
          });
      });
    });
  });
});
