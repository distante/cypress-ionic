import { getFromSupportedSelector } from '@helpers';
import { IonRange } from '@ionic/core/components/ion-range';

describe('Get From Supported Selector', () => {
  beforeEach(() => {
    cy.visit('./');
  });

  it('css selector', () => {
    getFromSupportedSelector('.testing-class').should(
      'have.text',
      'Label With Class',
    );
  });

  it('Chainable Object from class', () => {
    getFromSupportedSelector(cy.get('.testing-class')).should(
      'have.text',
      'Label With Class',
    );
  });

  it('Chainable Object from test-id', () => {
    getFromSupportedSelector(cy.findByTestId('testing-test-id')).should(
      'have.text',
      'Label With Test Id',
    );
  });

  it('JQuery Object', () => {
    cy.get('.testing-class').then(($jQueryObject) => {
      getFromSupportedSelector($jQueryObject).should(
        'have.text',
        'Label With Class',
      );
    });
  });

  describe('returns only visible element when selector matches both hidden and visible pages', () => {
    beforeEach(() => {
      cy.document().then((doc) => {
        doc.body.insertAdjacentHTML(
          'beforeend',
          `
            <div class="ion-page ion-page-hidden">
              <ion-label class="testing-class-conflict">Hidden Label</ion-label>
            </div>
            <div class="ion-page">
              <ion-label class="testing-class-conflict">Visible Label</ion-label>
            </div>
          `,
        );
      });
    });

    it('css selector', () => {
      getFromSupportedSelector('.testing-class-conflict')
        .should('have.length', 1)
        .should('have.text', 'Visible Label');
    });

    it('Chainable Object', () => {
      getFromSupportedSelector(cy.get('.testing-class-conflict'))
        .should('have.length', 1)
        .should('have.text', 'Visible Label');
    });

    it('JQuery Object', () => {
      cy.get('.testing-class-conflict').then(($jQueryObject) => {
        getFromSupportedSelector($jQueryObject)
          .should('have.length', 1)
          .should('have.text', 'Visible Label');
      });
    });
  });

  describe('ignores elements inside ion-page-hidden', () => {
    it('css selector', () => {
      getFromSupportedSelector('.testing-class-hidden').should(
        'have.length',
        0,
      );
    });

    it('Chainable Object', () => {
      getFromSupportedSelector(cy.get('.testing-class-hidden')).should(
        'have.length',
        0,
      );
    });

    it('JQuery Object', () => {
      cy.get('.testing-class-hidden').then(($jQueryObject) => {
        getFromSupportedSelector($jQueryObject).should('have.length', 0);
      });
    });
  });

  describe('filters hidden-page elements BEFORE asserting hydration', () => {
    beforeEach(() => {
      cy.document().then((doc) => {
        doc.body.insertAdjacentHTML(
          'beforeend',
          `<div class="ion-page ion-page-hidden">
             <div class="testing-order-bug">Not Hydrated Hidden</div>
           </div>
           <div class="ion-page">
             <div class="testing-order-bug hydrated">Visible Hydrated</div>
           </div>`,
        );
      });
    });

    it('Chainable - does not fail when a hidden element lacks .hydrated', () => {
      getFromSupportedSelector(cy.get('.testing-order-bug'))
        .should('have.length', 1)
        .should('have.text', 'Visible Hydrated');
    });

    it('JQuery - does not fail when a hidden element lacks .hydrated', () => {
      cy.get('.testing-order-bug').then(($els) => {
        getFromSupportedSelector($els)
          .should('have.length', 1)
          .should('have.text', 'Visible Hydrated');
      });
    });

    it('Chainable - returns empty set without timing out when all matches are hidden', () => {
      getFromSupportedSelector(
        cy.get('.testing-order-bug').filter(':not(.hydrated)'),
      ).should('have.length', 0);
    });

    it('JQuery - returns empty set without timing out when all matches are hidden', () => {
      cy.get('.testing-order-bug')
        .filter(':not(.hydrated)')
        .then(($els) => {
          getFromSupportedSelector($els).should('have.length', 0);
        });
    });

    it('css selector - returns empty set without timing out when all matches are hidden and not hydrated', () => {
      cy.document().then((doc) => {
        doc.body.insertAdjacentHTML(
          'beforeend',
          `<div class="ion-page ion-page-hidden">
             <div class="testing-order-hidden-only">Hidden Only</div>
           </div>`,
        );
      });

      getFromSupportedSelector('.testing-order-hidden-only').should(
        'have.length',
        0,
      );
    });
  });

  describe('waiting for components hydration', () => {
    it('css selector', () => {
      getFromSupportedSelector<IonRange>('.ion-range-to-test-hydration')
        .then(($ionRange) => {
          return $ionRange[0].shadowRoot?.querySelector(
            '.range-knob-handle-a, .range-knob-handle.range-knob-a',
          );
        })
        .should('exist');
    });

    it('Chainable Object', () => {
      getFromSupportedSelector<IonRange>(cy.get('.ion-range-to-test-hydration'))
        .then(($ionRange) => {
          return $ionRange[0].shadowRoot?.querySelector(
            '.range-knob-handle-a, .range-knob-handle.range-knob-a',
          );
        })
        .should('exist');
    });

    it('JQuery Object', () => {
      //mmm
      cy.get('.testing-class').then(($jQueryObject) => {
        getFromSupportedSelector($jQueryObject)
          .then(($ionRange) => {
            return $ionRange[0].shadowRoot?.querySelector(
              '.range-knob-handle-a, .range-knob-handle.range-knob-a',
            );
          })
          .should('exist');
      });
    });
  });
});
