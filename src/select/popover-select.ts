import { IonSelectFunctions } from './ion-select-functions.interface';

export class PopoverSelect implements IonSelectFunctions {
  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return cy
      .get(ionCssSelector)
      .click()
      .then(() => {
        return cy.get('ion-popover ion-select-popover ion-radio-group').first();
      })
      .then((radioGroup) => {
        console.log('radioGroup', radioGroup);
        const optionItems = radioGroup.children('ion-item');
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
}
