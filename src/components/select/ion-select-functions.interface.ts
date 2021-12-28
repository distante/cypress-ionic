import { IonSelect } from '@ionic/core/components/ion-select';
import {
  CypressIonicComponentClass,
  CypressIonicReturn,
  SupportedSelectors,
} from '@interfaces';

export abstract class IonSelectFunctions
  implements CypressIonicComponentClass<IonSelectFunctions, IonSelect>
{
  abstract selectByOptionIndex(
    selector: SupportedSelectors,
    optionIndex: number
  ): CypressIonicReturn<IonSelect>;

  abstract selectByOptionText(
    selector: SupportedSelectors,
    optionText: string
  ): CypressIonicReturn<IonSelect>;
}
