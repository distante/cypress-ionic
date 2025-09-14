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
    text: string,
    options?: {
      /**
       * Helpful to find Ionic components with Angular `[label]` bindings
       */
      inShadowDOM?: boolean;
    }
  ): CypressIonicReturn<HTMLIonSelectElement> {
    if (options?.inShadowDOM) {
      return cy
        .log(`finding ion select with label "${text}" in shadowDom`)
        .get('ion-select.hydrated')
        .shadow()
        .find('div[part="label"]')
        .contains(text)
        .closest('ion-select.hydrated');
    }

    const selectors: string[] = [
      `ion-select.hydrated[aria-label*="${text}"]`,
      `ion-select.hydrated[label*="${text}"]`,
      `ion-select.hydrated[ng-reflect-aria-label*="${text}"]`,
      `ion-select.hydrated[ng-reflect-label*="${text}"]`,
      `ion-select.hydrated:has(div[slot="label"]:contains("${text}"))`,
    ];
    return cy
      .log(`finding ion select with label "${text}"`)
      .get<HTMLIonSelectElement>(selectors.join(', '))
      .then((ionSelects$) => {
        if (!ionSelects$.length) {
          throw new Error(
            `No IonSelect with the given text was found (total IonSelect found: ${ionSelects$.length})`
          );
        }

        if (ionSelects$.length > 1) {
          throw new Error(
            `Too many IonSelect found (total ion-selects found: ${ionSelects$.length})`
          );
        }

        return ionSelects$;
      });
  }
}

export const ionSelectCypress = new Select();
