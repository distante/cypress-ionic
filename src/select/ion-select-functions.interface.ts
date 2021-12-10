export interface IonSelectFunctions {
  selectByOptionIndex(
    ionCssSelector: string,
    optionIndex: number
  ): Cypress.Chainable<void>;
}
