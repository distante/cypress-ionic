import type { HTMLStencilElement } from '@ionic/core';
import { CypressIonicReturn, SupportedSelectors } from '../interfaces';
/**
 * @internal
 */
export function getFromSupportedSelector<T extends HTMLStencilElement>(
  selector: SupportedSelectors<T>
): CypressIonicReturn<T> {
  if (typeof selector === 'string') {
    return cy.get<T>(`${selector}.hydrated`);
  }

  if (isJQuery<T>(selector)) {
    // selector.attr('cypress-ionic-test-id', )
    return cy.wrap(selector).should('have.class', 'hydrated');
  }

  return (selector as unknown as CypressIonicReturn<T>).should(
    'have.class',
    'hydrated'
  );
}

function isJQuery<T extends HTMLStencilElement>(
  selector: SupportedSelectors<T>
): selector is JQuery<T> {
  return !!(<JQuery<T>>selector).jquery;
}
