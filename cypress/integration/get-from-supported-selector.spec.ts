import { getFromSupportedSelector } from '@helpers';

describe('Get From Supported Selector', () => {
  beforeEach(() => {
    cy.visit('./');
  });

  it('gets an item by css selector', () => {
    getFromSupportedSelector('.testing-class').should(
      'have.text',
      'Label With Class'
    );
  });

  it('gets an item when given a Chainable Object from class', () => {
    getFromSupportedSelector(cy.get('.testing-class')).should(
      'have.text',
      'Label With Class'
    );
  });

  it('gets an item when given a Chainable Object from test-id', () => {
    getFromSupportedSelector(cy.findByTestId('testing-test-id')).should(
      'have.text',
      'Label With Test Id'
    );
  });

  it('gets an item when given an JQueryObject', () => {
    cy.get('.testing-class').then(($jQueryObject) => {
      getFromSupportedSelector($jQueryObject).should(
        'have.text',
        'Label With Class'
      );
    });
  });
});
