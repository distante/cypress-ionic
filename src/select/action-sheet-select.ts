import { IonSelectFunctions } from './ion-select-functions.interface';

export class ActionSheetSelect implements IonSelectFunctions {
  selectByOptionText(
    ionCssSelector: string,
    optionText: string
  ): Cypress.Chainable<void> {
    return this.getOptionButtonsContainer(ionCssSelector)
      .findByText(optionText)
      .parent()
      .click()
      .then(() => cy.wrap(void 0));
  }

  selectByOptionIndex(
    ionCssSelector: string,
    optionIndex: number
  ): Cypress.Chainable<void> {
    return this.getOptionsButtons(ionCssSelector).then((optionButtons) => {
      const wantedOption = optionButtons[optionIndex];

      if (!wantedOption) {
        const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`;
        console.warn(msg, optionButtons);
        throw new Error(msg);
      }

      wantedOption.click();
      return cy.wrap(void 0);
    });
  }

  private getOptionButtonsContainer(
    ionCssSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(ionCssSelector)
      .click()
      .then(() => {
        return cy.get('ion-action-sheet .action-sheet-group').first();
      });
  }

  private getOptionsButtons(
    ionCssSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getOptionButtonsContainer(ionCssSelector).children('button');
  }
}
