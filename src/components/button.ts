import { getFromSupportedSelector } from '@helpers';
import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';

class IonButtonCypress implements CypressIonicComponentClass<
  IonButtonCypress,
  HTMLIonButtonElement
> {
  public click(selector: SupportedSelectors<HTMLIonButtonElement>) {
    return getFromSupportedSelector<HTMLIonButtonElement>(selector).then(
      ($ionButton) => {
        return cy
          .wrap($ionButton)
          .shadow()
          .find('button')
          .click({ force: true })
          .then(() => $ionButton);
      },
    );
  }

  // @ts-expect-error This is a special case
  public clickByText(
    text: string,
  ): Cypress.Chainable<JQuery<HTMLIonButtonElement>> {
    return getFromSupportedSelector<HTMLIonButtonElement>(
      cy
        .get<HTMLIonButtonElement>('ion-button')
        .filter(
          (_i, el) => el.textContent?.replace(/\s+/g, ' ').trim() === text,
        ),
    ).click({ force: true });
  }
}

export const ionButtonCypress = new IonButtonCypress();
