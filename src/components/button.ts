import { getFromSupportedSelector } from '@helpers';
import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';

class IonButtonCypress
  implements CypressIonicComponentClass<IonButtonCypress, HTMLIonButtonElement>
{
  public click(selector: SupportedSelectors) {
    return getFromSupportedSelector<HTMLIonButtonElement>(selector).then(
      ($ionButton) => {
        return cy
          .wrap($ionButton)
          .shadow()
          .find('button')
          .click({ force: true })
          .then(() => $ionButton);
      }
    );
  }

  // @ts-expect-error This is a special case
  public clickByText(
    text: string
  ): Cypress.Chainable<JQuery<HTMLIonButtonElement>> {
    return cy
      .findByText(text)
      .closest<HTMLIonButtonElement>('ion-button')
      .click({ force: true });
  }
}

export const ionButtonCypress = new IonButtonCypress();
