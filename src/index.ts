export namespace CypressIonic {
  export function getButtonByTestId(ionButtonTestId: string) {
    return cy.findByTestId(ionButtonTestId).shadow().find('button');
  }

  export function getInputByTestId(ionInputTestId: string) {
    return cy.findByTestId(ionInputTestId).find('input');
  }
}