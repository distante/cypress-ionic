import { IonSelectFunctions } from './ion-select-functions.interface';

export class ActionSheetSelect implements IonSelectFunctions {
  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return cy
      .get(ionCssSelector)
      .click()
      .then(() => {
        return cy.get('ion-action-sheet .action-sheet-group').first();
      })
      .then((sheetGroup) => {
        const optionButtons = sheetGroup.children('button');
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
}
