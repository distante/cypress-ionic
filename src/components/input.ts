import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';
import { IonInput } from '@ionic/core/components/ion-input';
import { getFromSupportedSelector } from '@helpers';

class IonInputCypress
  implements CypressIonicComponentClass<IonInputCypress, IonInput>
{
  public write(selector: SupportedSelectors, text: string) {
    return getFromSupportedSelector<IonInput>(selector).then(($ionInput) => {
      return cy
        .wrap($ionInput)
        .find('input')
        .type(text)
        .then(() => $ionInput);
    });
  }

  public clear(selector: SupportedSelectors) {
    return getFromSupportedSelector<IonInput>(selector).then(($ionInput) => {
      return cy
        .wrap($ionInput)
        .find('input')
        .clear()
        .then(() => $ionInput);
    });
  }
}

export const ionInputCypress = new IonInputCypress();
