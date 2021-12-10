function click(ionCssSelector: string) {
  return cy.get(ionCssSelector).shadow().find('button').click();
}

export const ionButtonCypress = { click };
