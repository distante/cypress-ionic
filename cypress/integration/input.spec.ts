import { ionInputCypress } from '@lib';
import * as testHelpers from '../../test-helpers/test-helpers.js';

describe('Ion Input', () => {
  const selector = 'ion-input';
  beforeEach(() => {
    cy.visit('./');
  });

  it('can be written on by string selector', () => {
    cy.get(selector)
      .first()
      .then(($ionInput) => {
        const element = $ionInput[0];
        const wantedText = testHelpers.convertToTestString(element.innerText);

        ionInputCypress.write(selector, wantedText).then(() => {
          console.log('element', element);
          const inputElement = element.querySelector('input')?.value;

          expect(inputElement).to.eq(wantedText);
        });
      });
  });

  it('can be cleared', () => {
    cy.get(selector)
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
