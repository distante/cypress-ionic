export type SupportedSelectors =
  | string
  | Cypress.Chainable<JQuery<HTMLElement>>
  | JQuery<HTMLElement>;
