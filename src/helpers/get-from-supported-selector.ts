import { CypressIonicReturn, SupportedSelectors } from '../interfaces';

const HIDDEN_PAGE_SELECTOR = '.ion-page-hidden, .ion-page-hidden *';

/**
 * @internal
 */
export function getFromSupportedSelector<T extends Element>(
  selector: SupportedSelectors<T>,
): CypressIonicReturn<T> {
  if (typeof selector === 'string') {
    return filterThenAssertHydrated(cy.get<T>(selector));
  }

  if (isJQuery<T>(selector)) {
    return filterThenAssertHydrated(cy.wrap(selector) as CypressIonicReturn<T>);
  }

  return filterThenAssertHydrated(selector as unknown as CypressIonicReturn<T>);
}

function filterThenAssertHydrated<T extends Element>(
  subject: CypressIonicReturn<T>,
): CypressIonicReturn<T> {
  return subject.then((elements) => {
    const $visible = elements.not(HIDDEN_PAGE_SELECTOR) as unknown as JQuery<T>;
    if ($visible.length === 0) {
      return cy.wrap($visible);
    }
    return cy.wrap($visible).should('have.class', 'hydrated');
  }) as unknown as CypressIonicReturn<T>;
}

function isJQuery<T extends Element>(
  selector: SupportedSelectors<T>,
): selector is JQuery<T> {
  return !!(<JQuery<T>>selector).jquery;
}
