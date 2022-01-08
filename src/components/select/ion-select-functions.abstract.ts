import { CypressIonicReturn } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';

export abstract class IonSelectFunctions {
  constructor(
    private readonly optionsContainerCSSSelector: string,
    private readonly optionItemCSSSelector: string
  ) {}

  abstract selectByOptionIndex(
    $ionSelect: JQuery<IonSelect>,
    optionIndex: number
  ): CypressIonicReturn<IonSelect>;

  abstract selectByOptionText(
    $ionSelect: JQuery<IonSelect>,
    optionText: string
  ): CypressIonicReturn<IonSelect>;

  protected getOptionButtonsContainer(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($ionSelect[0])
      .click()
      .then(() => {
        return cy.get(this.optionsContainerCSSSelector).first();
      });
  }

  protected clickOnWantedOption(
    $ionSelect: JQuery<IonSelect>,
    optionIndex: number
  ): Cypress.Chainable<JQuery<IonSelect>> {
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
