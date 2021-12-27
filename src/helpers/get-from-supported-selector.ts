import { CypressIonicReturn, SupportedSelectors } from '../interfaces';

export function getFromSupportedSelector<T extends HTMLElement>(
  selector: SupportedSelectors
): CypressIonicReturn<T> {
  return cy.get<T>(selector);
}
