import { CypressIonicReturn, SupportedSelectors } from '@interfaces';
import { IonSelect } from '@ionic/core/components/ion-select';

/** @internal */
export interface IIonSelectFunctions {
  selectByOptionIndex(
    selector: SupportedSelectors,
    optionIndex: number
  ): CypressIonicReturn<IonSelect>;

  selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<IonSelect>;
}
