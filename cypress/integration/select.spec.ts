import { ionSelectCypress } from '@lib';

const selectors = [
  'ion-select[interface=alert]',
  'ion-select[interface=action-sheet]',
  'ion-select[interface=popover]',
];

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

    it('can select option by text', () => {
      const wantedOptionText = '3';
      cy.get(selector)
        .first()
        .then(() => {
          return ionSelectCypress.selectByOptionText(
            selector,
            wantedOptionText
          );
        })
        .then(() => {
          cy.get(selector).should('have.value', wantedOptionText);
        });
    });
  });
});
