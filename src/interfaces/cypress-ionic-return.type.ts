/**
 * @internal
 */
export type CypressIonicReturn<TReturn extends Element> = Cypress.Chainable<
  JQuery<TReturn>
>;
