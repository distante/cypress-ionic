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
  private getSelectInterfaceImplementor(
    selector: JQuery<IonSelect>
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
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return this.getSelectInterfaceImplementor($ionSelect).then(
        (ionsSelectFunctionImplementor) => {
          return ionsSelectFunctionImplementor.selectByOptionIndex(
            $ionSelect,
            optionIndex
          );
        }
      );
    });
  }

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<IonSelect> {
    return getFromSupportedSelector<IonSelect>(selector).then(($ionSelect) => {
      return cy
        .log(`Finding ion-select option with text "${optionText}"`)
        .then(() => {
          return this.getSelectInterfaceImplementor($ionSelect).then(
            (ionsSelectFunctionImplementor) => {
              return ionsSelectFunctionImplementor
                .selectByOptionText($ionSelect, optionText)
                .then((v) => {
                  return cy.wrap(v);
                });
            }
          );
        });
    });
  }

  findIonSelectByLabelText(text: string): CypressIonicReturn<IonSelect> {
    const wantedWords = text.split(' ');
    const wantedSelectors = wantedWords.map(
      (word) => `[aria-label~="${word}"]`
    );
    const finalSelector = `ion-select.hydrated${wantedSelectors.join('')}`;

    return cy
      .log(`finding ion select option with text "${text}"`)
      .get<IonSelect>(finalSelector)
      .then(($item) => {
        const ariaLabelIncludesText = $item[0]
          .getAttribute('aria-label')
          ?.includes(text);
        if (!ariaLabelIncludesText) {
          cy.log(
            'IonSelectCypress could not find the wanted label, it just found',
            $item[0]
          );
          throw new Error('IonSelectCypress could not find the wanted label.');
        }

        return $item;
      });
  }
}

export const ionSelectCypress = new Select();
