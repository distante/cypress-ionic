import { SelectInterface } from '@ionic/core/components';
import { IonSelect } from '@ionic/core/components/ion-select';

import { ActionSheetSelect } from './action-sheet-select';
import { AlertSelect } from './alert-select';
import { IonSelectFunctions } from './ion-select-functions.interface';

const alertSelect = new AlertSelect();
const actionSheetSelect = new ActionSheetSelect();

class Select implements IonSelectFunctions {
  #getSelectInterface(
    ionCssSelector: string
  ): Cypress.Chainable<SelectInterface> {
    return cy
      .get<JQuery<IonSelect>>(ionCssSelector)
      .then(($ionSelectElement) => {
        return $ionSelectElement[0].interface;
      });
  }

  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return this.#getSelectInterface(ionCssSelector).then(
      (interfaceOfSelect) => {
        switch (interfaceOfSelect) {
          case 'alert':
            return alertSelect.selectByOptionIndex(ionCssSelector, optionIndex);
          case 'action-sheet':
            return actionSheetSelect.selectByOptionIndex(
              ionCssSelector,
              optionIndex
            );

          default:
            throw new Error(`interface "${interfaceOfSelect}" not implemented`);
        }
      }
    );
  }
}

export const ionSelectCypress: IonSelectFunctions = new Select();
