import { CypressIonicReturn } from '@interfaces';

import { IonSelectFunctions } from './ion-select-functions.abstract';

export class ActionSheetSelect extends IonSelectFunctions {
  constructor() {
    super('ion-action-sheet.hydrated .action-sheet-group', 'button');
  }

  selectByOptionText(
    $ionSelect: JQuery<HTMLIonSelectElement>,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return this.getOptionButtonsContainer($ionSelect)
      .findByText(optionText)
      .parent()
      .click()
      .then(() => $ionSelect);
  }

  selectByOptionIndex(
    $ionSelect: JQuery<HTMLIonSelectElement>,
    optionIndex: number
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return this.clickOnWantedOption($ionSelect, optionIndex);
  }
}
