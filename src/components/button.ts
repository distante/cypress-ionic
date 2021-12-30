import { getFromSupportedSelector } from '@helpers';
import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';
import { IonButton } from '@ionic/core/components/ion-button';

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

  // @ts-expect-error This is a special case
  public clickByText(text: string): Cypress.Chainable<JQuery<IonButton>> {
    return cy
      .findByText(text)
      .closest<IonButton>('ion-button')
      .click({ force: true });
  }
}

export const ionButtonCypress = new IonButtonCypress();
