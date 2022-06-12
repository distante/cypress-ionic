import type { HTMLStencilElement } from '@ionic/core';

export type SupportedSelectors<T = HTMLStencilElement> =
  | string
  | Cypress.Chainable<JQuery<HTMLElement>>
  | JQuery<HTMLElement>
  | JQuery<T>;
