import { CypressIonicReturn, SupportedSelectors } from '../interfaces';

export function getFromSupportedSelector<T extends HTMLElement>(
  selector: SupportedSelectors
): CypressIonicReturn<T> {
  if (typeof selector === 'string') {
    return cy.get<T>(selector);
  }

  return selector as CypressIonicReturn<T>;
}
