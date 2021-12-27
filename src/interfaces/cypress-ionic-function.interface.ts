import { CypressIonicReturn } from './cypress-ionic-return.type';
import { SupportedSelectors } from './supported-selectors.interface';

export type CypressIonicFunction<TReturn> = (
  cssSelector: SupportedSelectors,
  options?: Record<string, any>
) => CypressIonicReturn<TReturn>;
