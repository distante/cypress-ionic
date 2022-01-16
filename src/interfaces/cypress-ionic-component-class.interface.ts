import { CypressIonicFunction } from './cypress-ionic-function.interface';

//  based on https://stackoverflow.com/questions/70498036/is-it-possible-to-force-that-all-class-public-methods-return-the-same-type-with?noredirect=1#comment124623714_70498036
/**
 * @internal
 */
export type CypressIonicComponentClass<TClassName, TComponentType> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof TClassName]: TClassName[K] extends Function
    ? CypressIonicFunction<TComponentType>
    : TClassName[K];
};
