export function clickOnIonButton(ionCssSelector: string) {
  return cy.get(ionCssSelector).shadow().find('button').click();
}
