import { CypressIonicReturn } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';

import { IonSelectFunctions } from './ion-select-functions.abstract';

export class ActionSheetSelect extends IonSelectFunctions {
  constructor() {
    super('ion-action-sheet .action-sheet-group', 'button');
  }

  selectByOptionText(
    $ionSelect: JQuery<IonSelect>,
    optionText: string
  ): CypressIonicReturn<IonSelect> {
    return this.getOptionButtonsContainer($ionSelect)
      .findByText(optionText)
      .parent()
      .click()
      .then(() => $ionSelect);
  }

  selectByOptionIndex(
    $ionSelect: JQuery<IonSelect>,
    optionIndex: number
  ): CypressIonicReturn<IonSelect> {
    return this.clickOnWantedOption($ionSelect, optionIndex);
  }
}
