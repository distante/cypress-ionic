import { IonSelect } from '@ionic/core/components/ion-select';
import { CypressIonicReturn } from '@interfaces';

export interface IonSelectFunctions {
  selectByOptionIndex(
    ionCssSelector: string,
    optionIndex: number
  ): CypressIonicReturn<IonSelect>;

  selectByOptionText(
    ionCssSelector: string,
    optionText: string
  ): CypressIonicReturn<IonSelect>;
}
