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
    selector: JQuery<HTMLIonSelectElement>
  ): Cypress.Chainable<IonSelectFunctions> {
    return getFromSupportedSelector<HTMLIonSelectElement>(selector).then(
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

  selectByOptionIndex(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionIndex: number
  ) {
    return getFromSupportedSelector<HTMLIonSelectElement>(selector).then(
      ($ionSelect) => {
        return this.getSelectInterfaceImplementor($ionSelect).then(
          (ionsSelectFunctionImplementor) => {
            return ionsSelectFunctionImplementor.selectByOptionIndex(
              $ionSelect,
              optionIndex
            );
          }
        );
      }
    );
  }

  selectByOptionText(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return getFromSupportedSelector<HTMLIonSelectElement>(selector).then(
      ($ionSelect) => {
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
      }
    );
  }

  findIonSelectByLabelText(
    text: string
  ): CypressIonicReturn<HTMLIonSelectElement> {
    return cy
      .log(`finding ion select with label "${text}"`)
      .get<HTMLIonSelectElement>('ion-select.hydrated')
      .then((ionSelects$) => {
        const $itemsWithWantedText = ionSelects$.filter((_index, item) => {
          if (item.getAttribute('aria-label')?.includes(text)) {
            return true;
          }
          if (item.getAttribute('label')?.includes(text)) {
            return true;
          }

          return false;
        });

        if (!$itemsWithWantedText.length) {
          throw new Error(
            `No IonSelect with the given text was found (total IonSelect found: ${ionSelects$.length})`
          );
        }

        if ($itemsWithWantedText.length > 1) {
          throw new Error(
            `Too many IonSelect found (total ion-selects found: ${ionSelects$.length})`
          );
        }

        return $itemsWithWantedText;
      });
  }
}

export const ionSelectCypress = new Select();
