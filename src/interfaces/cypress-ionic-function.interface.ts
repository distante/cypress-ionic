import { CypressIonicReturn } from './cypress-ionic-return.type';
import { SupportedSelectors } from './supported-selectors.interface';

/**
 * @internal
 */
export type CypressIonicFunction<TReturn> = (
  cssSelector: SupportedSelectors,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any // Any because we do not know what will this be.
) => CypressIonicReturn<TReturn>;
