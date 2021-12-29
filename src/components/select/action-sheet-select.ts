import { IonSelect } from '@ionic/core/components/ion-select';
import { CypressIonicReturn, SupportedSelectors } from '@interfaces';
import { IonSelectFunctions } from './ion-select-functions.interface';
import { getFromSupportedSelector } from '@helpers';

export class ActionSheetSelect implements IonSelectFunctions {
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
      return this.getOptionsButtons($ionSelect).then((optionButtons) => {
        const wantedOption = optionButtons[optionIndex];

        if (!wantedOption) {
          const msg = `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`;
          console.warn(msg, optionButtons);
          throw new Error(msg);
        }

        wantedOption.click();
        return $ionSelect;
      });
    });
  }

  private getOptionButtonsContainer(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($ionSelect[0])
      .click()
      .then(() => {
        return cy.get('ion-action-sheet .action-sheet-group').first();
      });
  }

  private getOptionsButtons(
    $ionSelect: JQuery<IonSelect>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getOptionButtonsContainer($ionSelect).children('button');
  }
}
