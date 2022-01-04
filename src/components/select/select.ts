import { IonSelect } from '@ionic/core/components/ion-select';
import { getFromSupportedSelector } from '../../helpers';
import { CypressIonicReturn, SupportedSelectors } from '../../interfaces';

import { ActionSheetSelect } from './action-sheet-select';
import { AlertSelect } from './alert-select';
import { IonSelectFunctions } from './ion-select-functions.abstract';
import { IIonSelectFunctions } from './ion-select-functions.interface';
import { PopoverSelect } from './popover-select';

const alertSelect = new AlertSelect();
const actionSheetSelect = new ActionSheetSelect();
const popoverSelect = new PopoverSelect();

class Select implements IIonSelectFunctions {
  #getSelectInterfaceImplementor(
    selector: SupportedSelectors
  ): Cypress.Chainable<IonSelectFunctions> {
    return getFromSupportedSelector<IonSelect>(selector).then(
      ($ionSelectElement) => {
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
      }
    );
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

  findIonSelectByLabelText(text: string): CypressIonicReturn<IonSelect> {
    return cy.get('ion-select').then(($ionSelects) => {
      const ionSelectElements = $ionSelects.filter(function () {
        return !!this.getAttribute('aria-label')?.includes(text);
      });

      if (ionSelectElements.length > 1) {
        cy.log(
          `More than one IonSelect element was found with the text "${text}", using the first one`
        );
      }

      return ionSelectElements[0];
    });
  }
}

export const ionSelectCypress = new Select();
