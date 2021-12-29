import { IonSelectFunctions } from './ion-select-functions.abstract';
import { getFromSupportedSelector } from '@helpers';
import { SupportedSelectors } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';

export class AlertSelect extends IonSelectFunctions {
  constructor() {
    super('ion-alert [role="radiogroup"]', 'button');
  }

  selectByOptionIndex(selector: SupportedSelectors, optionIndex: number) {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.clickOnWantedOption($ionSelect, optionIndex)
        .then(() => this.clickOkOnAlert())
        .then(() => $ionSelect);
    });
  }

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): Cypress.Chainable<JQuery<IonSelect>> {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.getOptionButtonsContainer($ionSelect)
        .findByText(optionText)
        .click()
        .then(() => this.clickOkOnAlert())
        .then(() => $ionSelect);
    });
  }

  private clickOkOnAlert(): Cypress.Chainable<void> {
    return cy
      .get('ion-alert .alert-button-group button')
      .then((actionButtons) => {
        const okayButton = actionButtons[actionButtons.length - 1];
        console.log('okayButton', okayButton);
        return cy.wrap(okayButton).click();
      })
      .then(() => {
        return cy.wrap(void 0);
      });
  }
}
