import { ionSelectCypress } from '@lib';

describe('IonSelect', () => {
  beforeEach(() => {
    cy.visit('./');
  });

  const byInterfaceSelectors = [
    'ion-select[interface=alert]',
    'ion-select[interface=action-sheet]',
    'ion-select[interface=popover]',
  ];

  byInterfaceSelectors.forEach((selector) => {
    describe(selector, () => {
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

  const byTextWithSelectors: Array<{ elementSelector: string; text: string }> =
    [
      {
        elementSelector: 'ion-select[interface=alert]',
        text: 'ion-select ion-alert',
      },
      {
        elementSelector: 'ion-select[interface=action-sheet]',
        text: 'ion-select ion-action-sheet',
      },
      {
        elementSelector: 'ion-select[interface=popover]',
        text: 'ion-select ion-popover',
      },
    ];

  byTextWithSelectors.forEach((textAndSelector) => {
    describe(`find ${textAndSelector.elementSelector} using text`, () => {
      it(`can be found with "${textAndSelector.text}"`, () => {
        cy.get(textAndSelector.elementSelector)
          .should('have.length', 1) // check that just one is tested
          .then(($wantedIonSelect) => {
            ionSelectCypress
              .findIonSelectByLabelText(textAndSelector.text)
              .then(($ionSelectFromLibrary) => {
                expect($ionSelectFromLibrary[0].id).to.eq(
                  $wantedIonSelect[0].id
                );
              });
          });
      });

      it('can be used to select option by number', () => {
        ionSelectCypress
          .selectByOptionIndex(
            ionSelectCypress.findIonSelectByLabelText(textAndSelector.text),
            2
          )
          .then(() => {
            cy.get(textAndSelector.elementSelector).should('have.value', '2');
          });
      });

      it('can be used to select option by text', () => {
        const wantedOptionText = '3';
        return ionSelectCypress
          .selectByOptionText(
            ionSelectCypress.findIonSelectByLabelText(textAndSelector.text),
            wantedOptionText
          )
          .then(() => {
            cy.get(textAndSelector.elementSelector).should(
              'have.value',
              wantedOptionText
            );
          });
      });
    });
  });
});
