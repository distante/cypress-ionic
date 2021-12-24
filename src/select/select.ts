import { IonSelect } from '@ionic/core/components/ion-select';

import { ActionSheetSelect } from './action-sheet-select';
import { AlertSelect } from './alert-select';
import { IonSelectFunctions } from './ion-select-functions.interface';
import { PopoverSelect } from './popover-select';

const alertSelect = new AlertSelect();
const actionSheetSelect = new ActionSheetSelect();
const popoverSelect = new PopoverSelect();

class Select implements IonSelectFunctions {
  #getSelectInterfaceImplementor(
    ionCssSelector: string
  ): Cypress.Chainable<IonSelectFunctions> {
    return cy
      .get<JQuery<IonSelect>>(ionCssSelector)
      .then(($ionSelectElement) => {
        const interfaceOfSelect = $ionSelectElement[0].interface;
        switch ($ionSelectElement[0].interface) {
          case 'alert':
            return alertSelect;
          case 'action-sheet':
            return actionSheetSelect;
          case 'popover':
            return popoverSelect;
          default:
            throw new Error(`interface "${interfaceOfSelect}" not implemented`);
        }
      });
  }

  selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
    return this.#getSelectInterfaceImplementor(ionCssSelector).then(
      (ionsSelectFunctionImplementor) => {
        return ionsSelectFunctionImplementor.selectByOptionIndex(
          ionCssSelector,
          optionIndex
        );
      }
    );
  }

  selectByOptionText(
    ionCssSelector: string,
    optionText: string
  ): Cypress.Chainable<void> {
    return this.#getSelectInterfaceImplementor(ionCssSelector).then(
      (ionsSelectFunctionImplementor) => {
        return ionsSelectFunctionImplementor.selectByOptionText(
          ionCssSelector,
          optionText
        );
      }
    );
  }
}

export const ionSelectCypress: IonSelectFunctions = new Select();
