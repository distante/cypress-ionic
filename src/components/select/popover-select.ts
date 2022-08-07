import { CypressIonicReturn, SupportedSelectors } from '@interfaces';
import { getFromSupportedSelector } from '@helpers';
import { IonSelectFunctions } from './ion-select-functions.abstract';

export class PopoverSelect extends IonSelectFunctions {
  constructor() {
    super(
      'ion-popover.hydrated ion-select-popover.hydrated ion-radio-group.hydrated',
      'ion-item'
    );
  }

  public selectByOptionText(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return getFromSupportedSelector<HTMLIonSelectElement>(selector).then(
      ($ionSelect) => {
        return this.getOptionButtonsContainer($ionSelect)
          .findByText(optionText)
          .parent()
          .click()
          .then(() => $ionSelect);
      }
    );
  }

  selectByOptionIndex(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionIndex: number
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return getFromSupportedSelector<HTMLIonSelectElement>(selector).then(
      ($ionSelect) => {
        return this.clickOnWantedOption($ionSelect, optionIndex);
      }
    );
  }
}
