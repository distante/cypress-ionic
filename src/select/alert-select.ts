import { IonSelectFunctions } from './ion-select-functions.interface';

export class AlertSelect implements IonSelectFunctions {
  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return cy
      .get(ionCssSelector)
      .click()
      .then(() => {
        return cy.get('ion-alert [role="radiogroup"]').first();
      })
      .then((radioGroup) => {
        const optionButtons = radioGroup.children('button');
        const wantedOption = optionButtons[optionIndex];

        if (!wantedOption) {
          const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`;
          console.warn(msg, optionButtons);
          throw new Error(msg);
        }

        return cy.wrap(wantedOption).click();
      })
      .then(() => cy.get('ion-alert .alert-button-group button'))
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
