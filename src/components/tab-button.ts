import { getFromSupportedSelector } from '@helpers';
import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';

class IonTabButtonCypress implements CypressIonicComponentClass<
  IonTabButtonCypress,
  HTMLIonTabButtonElement
> {
  public click(selector: SupportedSelectors<HTMLIonTabButtonElement>) {
    return getFromSupportedSelector<HTMLIonTabButtonElement>(selector).then(
      ($ionTabButton) => {
        return cy
          .wrap($ionTabButton)
          .shadow()
          .find('a.button-native')
          .click({ force: true })
          .then(() => $ionTabButton);
      },
    );
  }

  // @ts-expect-error This is a special case
  public clickByText(
    text: string,
  ): Cypress.Chainable<JQuery<HTMLIonTabButtonElement>> {
    return getFromSupportedSelector<HTMLIonTabButtonElement>(
      cy
        .get<HTMLIonTabButtonElement>('ion-tab-button')
        .filter(
          (_i, el) => el.textContent?.replace(/\s+/g, ' ').trim() === text,
        ),
    ).then(($ionTabButton) => {
      return cy
        .wrap($ionTabButton)
        .shadow()
        .find('a.button-native')
        .click({ force: true })
        .then(() => $ionTabButton);
    });
  }
}

export const ionTabButtonCypress = new IonTabButtonCypress();
