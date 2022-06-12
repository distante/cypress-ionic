import { CypressIonicReturn, SupportedSelectors } from '@interfaces';

/** @internal */
export interface IIonSelectFunctions {
  selectByOptionIndex(
    selector: SupportedSelectors,
    optionIndex: number
  ): CypressIonicReturn<HTMLIonSelectElement>;

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement>;
}
