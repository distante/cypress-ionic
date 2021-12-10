function selectByOptionIndex(ionCssSelector: string, optionIndex: number) {
  return cy
    .get(ionCssSelector)
    .click()
    .then(() => {
      return cy.get('ion-alert [role="radiogroup"]').first();
    })
    .then((radioGroup) => {
      const optionButtons = radioGroup.children('button');
      const wantedOption = optionButtons[optionIndex];

      if (!wantedOption) {
        throw new Error(
          `There was no option with index ${optionIndex} on the give ionSelect. Total options: ${optionButtons.length}`
        );
      }

      wantedOption.click();
      return cy.get('ion-alert .alert-button-group button');
    })
    .then((actionButtons) => {
      const okayButton = actionButtons[actionButtons.length - 1];
      console.log('okayButton', okayButton);
      return cy.wrap(okayButton).click();
    })
    .then(() => {
      return cy.wait(100);
    });
}

export const ionSelectCypress = { selectByOptionIndex };
