export type SupportedSelectors<T extends Element> =
  | string
  | Cypress.Chainable<JQuery<HTMLElement>>
  | JQuery<HTMLElement>
  | Cypress.Chainable<JQuery<T>>
  | JQuery<T>
  | JQuery<T>;
