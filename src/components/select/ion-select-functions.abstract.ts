import { CypressIonicReturn } from '@interfaces';

/** @internal */
export abstract class IonSelectFunctions {
  constructor(
    private readonly optionsContainerCSSSelector: string,
    private readonly optionItemCSSSelector: string
  ) {}

  abstract selectByOptionIndex(
    $ionSelect: JQuery<HTMLIonSelectElement>,
    optionIndex: number
  ): CypressIonicReturn<HTMLIonSelectElement>;

  abstract selectByOptionText(
    $ionSelect: JQuery<HTMLIonSelectElement>,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement>;

  protected getOptionButtonsContainer(
    $ionSelect: JQuery<HTMLIonSelectElement>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($ionSelect[0])
      .click()
      .then(() => {
        return cy.get(this.optionsContainerCSSSelector).first();
      });
  }

  protected clickOnWantedOption(
    $ionSelect: JQuery<HTMLIonSelectElement>,
    optionIndex: number
  ): Cypress.Chainable<JQuery<HTMLIonSelectElement>> {
    return this.getOptionButtonsContainer($ionSelect)
      .children(this.optionItemCSSSelector)
      .then((optionButtons) => {
        const wantedOption = optionButtons[optionIndex];

        if (!wantedOption) {
          const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`;
          // eslint-disable-next-line no-console
          console.warn(msg, optionButtons);
          throw new Error(msg);
        }

        return cy
          .wrap(wantedOption)
          .click()
          .then(() => $ionSelect);
      });
  }
}
