import { ionSelectCypress } from '@lib';

const selectors = ['ion-select[interface=alert]'];
selectors.forEach((selector) => {
  describe(selector, () => {
    beforeEach(() => {
      cy.visit('./');
    });

    it('can select option by number', () => {
      cy.get(selector)
        .first()
        .then(() => {
          return ionSelectCypress.selectByOptionIndex(selector, 2);
        })
        .then(() => {
          cy.get(selector).should('have.value', '2');
        });
    });
  });
});
