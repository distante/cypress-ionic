import { getFromSupportedSelector } from '@helpers';
import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';
import { IonButton } from 'currentIonicVersion/components/ion-button';

class IonButtonCypress
  implements CypressIonicComponentClass<IonButtonCypress, IonButton>
{
  public click(selector: SupportedSelectors) {
    return getFromSupportedSelector<IonButton>(selector).then(($ionButton) => {
      return cy
        .wrap($ionButton)
        .shadow()
        .find('button')
        .click()
        .then(() => $ionButton);
    });
  }
}

export const ionButtonCypress = new IonButtonCypress();
