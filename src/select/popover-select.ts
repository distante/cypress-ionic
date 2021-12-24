import { IonSelectFunctions } from './ion-select-functions.interface';

export class PopoverSelect implements IonSelectFunctions {
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

  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return this.getOptionsButtons(ionCssSelector)
      .then((optionItems) => {
        const wantedOption = optionItems[optionIndex];

        if (!wantedOption) {
          const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionItems.length}`;
          console.warn(msg, optionItems);
          throw new Error(msg);
        }

        console.log('wantedOption', wantedOption);

        return cy.wrap(wantedOption).click();
      })
      .then(() => cy.wrap(void 0));
  }

  private getOptionButtonsContainer(
    ionCssSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(ionCssSelector)
      .click()
      .then(() => {
        return cy.get('ion-popover ion-select-popover ion-radio-group').first();
      });
  }

  private getOptionsButtons(
    ionCssSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getOptionButtonsContainer(ionCssSelector).children('ion-item');
  }
}
