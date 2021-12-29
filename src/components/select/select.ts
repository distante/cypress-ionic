import { IonSelect } from '@ionic/core/components/ion-select';
import { CypressIonicReturn, SupportedSelectors } from '../../interfaces';

import { ActionSheetSelect } from './action-sheet-select';
import { AlertSelect } from './alert-select';
import { IonSelectFunctions } from './ion-select-functions.abstract';
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

  selectByOptionIndex(selector: SupportedSelectors, optionIndex: number) {
    return this.#getSelectInterfaceImplementor(selector).then(
      (ionsSelectFunctionImplementor) => {
        return ionsSelectFunctionImplementor.selectByOptionIndex(
          selector,
          optionIndex
        );
      }
    );
  }

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<IonSelect> {
    return this.#getSelectInterfaceImplementor(selector).then(
      (ionsSelectFunctionImplementor) => {
        return ionsSelectFunctionImplementor.selectByOptionText(
          selector,
          optionText
        );
      }
    );
  }
}

export const ionSelectCypress = new Select();
