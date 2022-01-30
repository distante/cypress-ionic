import { IonSelect } from '@ionic/core/components/ion-select';

import { IonSelectFunctions } from './ion-select-functions.abstract';

export class AlertSelect extends IonSelectFunctions {
  constructor() {
    super('ion-alert.hydrated [role="radiogroup"]', 'button');
  }

  selectByOptionIndex($ionSelect: JQuery<IonSelect>, optionIndex: number) {
    return this.clickOnWantedOption($ionSelect, optionIndex)
      .then(() => this.clickOkOnAlert())
      .then(() => $ionSelect);
  }

  selectByOptionText(
    $ionSelect: JQuery<IonSelect>,
    optionText: string
  ): Cypress.Chainable<JQuery<IonSelect>> {
    return this.getOptionButtonsContainer($ionSelect)
      .findByText(optionText)
      .click()
      .then(() => this.clickOkOnAlert())
      .then(() => $ionSelect);
  }

  private clickOkOnAlert(): Cypress.Chainable<void> {
    return cy
      .get('ion-alert.hydrated .alert-button-group button')
      .then((actionButtons) => {
        const okayButton = actionButtons[actionButtons.length - 1];
        return cy.wrap(okayButton).click();
      })
      .then(() => {
        return cy.wrap(void 0);
      });
  }
}
