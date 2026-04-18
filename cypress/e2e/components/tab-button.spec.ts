import { ionTabButtonCypress } from '@lib';

describe('Ion Tab Button', () => {
  beforeEach(() => {
    cy.visit('./ion-tab-button.html');
  });

  it('should be clicked by CSS selector and fire ionTabButtonClick', () => {
    ionTabButtonCypress.click('ion-tab-button.tab-settings');

    cy.get('#tab-click-status').should('have.text', 'clicked:settings');
  });

  it('should be clicked by jQuery element and fire ionTabButtonClick', () => {
    cy.get('ion-tab-button.tab-profile').then(($tabButton) => {
      ionTabButtonCypress.click($tabButton);

      cy.get('#tab-click-status').should('have.text', 'clicked:profile');
    });
  });

  it('clicking one tab button does not trigger another tab', () => {
    ionTabButtonCypress.click('ion-tab-button.tab-home');

    cy.get('#tab-click-status').should('have.text', 'clicked:home');
    cy.get('#tab-click-status').should('not.have.text', 'clicked:settings');
  });

  it('should be clicked by text and fire ionTabButtonClick', () => {
    ionTabButtonCypress.clickByText('Settings');

    cy.get('#tab-click-status').should('have.text', 'clicked:settings');
  });

  it('clickByText should return the ion-tab-button element', () => {
    ionTabButtonCypress
      .clickByText('Profile')
      .should('match', 'ion-tab-button');
  });

  it('clickByText should not click a tab button inside a hidden page', () => {
    ionTabButtonCypress
      .clickByText('Settings')
      .should('have.class', 'tab-settings');

    cy.get('#tab-click-status').should('have.text', 'clicked:settings');
  });
});
