import { CypressIonicReturn, SupportedSelectors } from '@interfaces';

/** @internal */
export interface IIonSelectFunctions {
  selectByOptionIndex(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionIndex: number
  ): CypressIonicReturn<HTMLIonSelectElement>;

  selectByOptionText(
    selector: SupportedSelectors<HTMLIonSelectElement>,
    optionText: string
  ): CypressIonicReturn<HTMLIonSelectElement>;
}
