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
        const indexIsIndexOfDismissButton =
          optionIndex === optionButtons.length;
        if (!wantedOption || indexIsIndexOfDismissButton) {
          throw new Error(
            `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${
              optionButtons.length - 1
            }`
          );
        }

        wantedOption.click();
        return cy.wrap(void 0);
      });
  }
}
