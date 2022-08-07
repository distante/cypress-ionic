import type { HTMLStencilElement } from '@ionic/core';

/**
 * @internal
 */
export type CypressIonicReturn<TReturn extends HTMLStencilElement> =
  Cypress.Chainable<JQuery<TReturn>>;
