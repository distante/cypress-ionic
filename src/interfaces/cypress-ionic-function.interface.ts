import type { HTMLStencilElement } from '@ionic/core';
import { CypressIonicReturn } from './cypress-ionic-return.type';
import { SupportedSelectors } from './supported-selectors.interface';

/**
 * @internal
 */
export type CypressIonicFunction<TReturn extends HTMLStencilElement> = (
  cssSelector: SupportedSelectors<TReturn>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any // Any because we do not know what will this be.
) => CypressIonicReturn<TReturn>;
