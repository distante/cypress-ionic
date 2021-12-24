export interface IonSelectFunctions {
  selectByOptionIndex(
    ionCssSelector: string,
    optionIndex: number
  ): Cypress.Chainable<void>;

  selectByOptionText(
    ionCssSelector: string,
    optionText: string
  ): Cypress.Chainable<void>;
}
