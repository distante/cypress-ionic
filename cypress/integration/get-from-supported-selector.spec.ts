import { getFromSupportedSelector } from '@helpers';
import { IonRange } from '@ionic/core/components/ion-range';

describe('Get From Supported Selector', () => {
  beforeEach(() => {
    cy.visit('./');
  });

  it('css selector', () => {
    getFromSupportedSelector('.testing-class').should(
      'have.text',
      'Label With Class'
    );
  });

  it('Chainable Object from class', () => {
    getFromSupportedSelector(cy.get('.testing-class')).should(
      'have.text',
      'Label With Class'
    );
  });

  it('Chainable Object from test-id', () => {
    getFromSupportedSelector(cy.findByTestId('testing-test-id')).should(
      'have.text',
      'Label With Test Id'
    );
  });

  it('JQuery Object', () => {
    cy.get('.testing-class').then(($jQueryObject) => {
      getFromSupportedSelector($jQueryObject).should(
        'have.text',
        'Label With Class'
      );
    });
  });

  describe('waiting for components hydration', () => {
    it('css selector', () => {
      getFromSupportedSelector<IonRange>('.ion-range-to-test-hydration')
        .then(($ionRange) => {
          return $ionRange[0].shadowRoot?.querySelector(
            '.range-knob-handle.range-knob-a'
          );
        })
        .should('exist');
    });

    it('Chainable Object', () => {
      getFromSupportedSelector<IonRange>(cy.get('.ion-range-to-test-hydration'))
        .then(($ionRange) => {
          return $ionRange[0].shadowRoot?.querySelector(
            '.range-knob-handle.range-knob-a'
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
              '.range-knob-handle.range-knob-a'
            );
          })
          .should('exist');
      });
    });
  });
});
