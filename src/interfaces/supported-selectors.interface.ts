import type { HTMLStencilElement } from '@ionic/core';

export type SupportedSelectors<T extends HTMLStencilElement> =
  | string
  | Cypress.Chainable<JQuery<HTMLElement>>
  | JQuery<HTMLElement>
  | Cypress.Chainable<JQuery<T>>
  | JQuery<T>
  | JQuery<T>;
