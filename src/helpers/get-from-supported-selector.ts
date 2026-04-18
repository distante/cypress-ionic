import { CypressIonicReturn, SupportedSelectors } from '../interfaces';
/**
 * @internal
 */
export function getFromSupportedSelector<T extends Element>(
  selector: SupportedSelectors<T>,
): CypressIonicReturn<T> {
  if (typeof selector === 'string') {
    return filterOutHiddenPage(cy.get<T>(`${selector}.hydrated`));
  }

  if (isJQuery<T>(selector)) {
    return filterThenAssertHydrated(cy.wrap(selector) as CypressIonicReturn<T>);
  }

  return filterThenAssertHydrated(selector as unknown as CypressIonicReturn<T>);
}

function filterOutHiddenPage<T extends Element>(
  subject: CypressIonicReturn<T>,
): CypressIonicReturn<T> {
  return subject.not(
    '.ion-page-hidden, .ion-page-hidden *',
  ) as unknown as CypressIonicReturn<T>;
}

function filterThenAssertHydrated<T extends Element>(
  subject: CypressIonicReturn<T>,
): CypressIonicReturn<T> {
  return subject.then((elements) => {
    const $visible = elements.not(
      '.ion-page-hidden, .ion-page-hidden *',
    ) as unknown as JQuery<T>;
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
