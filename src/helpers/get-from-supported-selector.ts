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
    return filterOutHiddenPage(
      cy
        .wrap(selector)
        .should('have.class', 'hydrated') as CypressIonicReturn<T>,
    );
  }

  return filterOutHiddenPage(
    (selector as unknown as CypressIonicReturn<T>).should(
      'have.class',
      'hydrated',
    ),
  );
}

function filterOutHiddenPage<T extends Element>(
  subject: CypressIonicReturn<T>,
): CypressIonicReturn<T> {
  return subject.not('.ion-page-hidden *') as unknown as CypressIonicReturn<T>;
}

function isJQuery<T extends Element>(
  selector: SupportedSelectors<T>,
): selector is JQuery<T> {
  return !!(<JQuery<T>>selector).jquery;
}
