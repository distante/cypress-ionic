import { IonButton } from '@ionic/core/components/ion-button';

import { CypressIonicFunction, SupportedSelectors } from '@interfaces';
import { getFromSupportedSelector } from '@helpers';

class IonButtonCypress {
  public readonly click: CypressIonicFunction<IonButton> = (
    selector: SupportedSelectors
  ) => {
    return getFromSupportedSelector<IonButton>(selector).then(($ionButton) => {
      return cy
        .wrap($ionButton)
        .shadow()
        .find('button')
        .click()
        .then(() => $ionButton);
    });
  };
}

export const ionButtonCypress = new IonButtonCypress();
