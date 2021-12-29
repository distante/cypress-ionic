import { IonSelectFunctions } from './ion-select-functions.interface';
import { getFromSupportedSelector } from '@helpers';
import { SupportedSelectors } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';

export class AlertSelect implements IonSelectFunctions {
  selectByOptionIndex(selector: SupportedSelectors, optionIndex: number) {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.getOptionButtons($ionSelect)
        .then((optionButtons) => {
          const wantedOption = optionButtons[optionIndex];

          if (!wantedOption) {
            const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`;
            console.warn(msg, optionButtons);
            throw new Error(msg);
          }

          return cy.wrap(wantedOption).click();
        })
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

  private getOptionButtonsContainer(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($ionSelect[0])
      .click()
      .get('ion-alert [role="radiogroup"]')
      .first();
  }

  private getOptionButtons(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLButtonElement>> {
    return this.getOptionButtonsContainer($ionSelect).children('button');
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
