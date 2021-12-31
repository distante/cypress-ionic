import { CypressIonicReturn, SupportedSelectors } from '../interfaces';

export function getFromSupportedSelector<T extends HTMLElement>(
  selector: SupportedSelectors
): CypressIonicReturn<T> {
  if (typeof selector === 'string') {
    return cy.get<T>(selector);
  }

  if (isJQuery<T>(selector)) {
    return cy.wrap(selector);
  }

  return selector as CypressIonicReturn<T>;
}

function isJQuery<T extends HTMLElement>(
  selector: SupportedSelectors
): selector is JQuery<T> {
  return !!(<JQuery<T>>selector).jquery;
}
