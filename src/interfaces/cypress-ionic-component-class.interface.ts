import { CypressIonicFunction } from './cypress-ionic-function.interface';

export type CypressIonicComponentClass<T> = Record<
  string,
  CypressIonicFunction<T>
>;
