import { CypressIonicReturn, SupportedSelectors } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';
import { getFromSupportedSelector } from '@helpers';
import { IonSelectFunctions } from './ion-select-functions.interface';

export class PopoverSelect implements IonSelectFunctions {
  public selectByOptionText(
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
      return this.getOptionsButtons($ionSelect)
        .then((optionItems) => {
          const wantedOption = optionItems[optionIndex];

          if (!wantedOption) {
            const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionItems.length}`;
            console.warn(msg, optionItems);
            throw new Error(msg);
          }

          return cy.wrap(wantedOption).click();
        })
        .then(() => $ionSelect);
    });
  }

  private getOptionButtonsContainer(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($ionSelect)
      .click()
      .then(() => {
        return cy.get('ion-popover ion-select-popover ion-radio-group').first();
      });
  }

  private getOptionsButtons(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getOptionButtonsContainer($ionSelect).children('ion-item');
  }
}
