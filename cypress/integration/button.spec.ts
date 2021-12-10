import { ionButtonCypress } from '@lib';
import * as testHelpers from '../../test-helpers/test-helpers.js';

describe('Ion Button', () => {
  const selector = 'ion-button';
  beforeEach(() => {
    cy.visit('./');
  });

  it('should be clicked', () => {
    cy.get(selector)
      .first()
      .then((ionButton) => {
        const wantedText = testHelpers.convertToTestString(
          ionButton[0].innerText
        );

        ionButtonCypress.click(selector);

        cy.contains(wantedText, { matchCase: false }).should('exist');
      });
  });
});
