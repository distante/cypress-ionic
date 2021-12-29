import { IonSelect } from '@ionic/core/components/ion-select';
import { CypressIonicReturn, SupportedSelectors } from '@interfaces';
import { IonSelectFunctions } from './ion-select-functions.abstract';
import { getFromSupportedSelector } from '@helpers';

export class ActionSheetSelect extends IonSelectFunctions {
  constructor() {
    super('ion-action-sheet .action-sheet-group', 'button');
  }

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<IonSelect> {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.getOptionButtonsContainer($ionSelect)
        .findByText(optionText)
        .parent()
        .click()
        .then(() => $ionSelect);
    });
  }

  selectByOptionIndex(
    selector: string,
    optionIndex: number
  ): CypressIonicReturn<IonSelect> {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.clickOnWantedOption($ionSelect, optionIndex);
    });
  }
}
