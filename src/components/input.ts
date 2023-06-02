import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';
import { getFromSupportedSelector } from '@helpers';

class IonInputCypress
  implements CypressIonicComponentClass<IonInputCypress, HTMLIonInputElement>
{
  public write(
    selector: SupportedSelectors<HTMLIonInputElement>,
    text: string
  ) {
    return getFromSupportedSelector<HTMLIonInputElement>(selector).then(
      ($ionInput) => {
        return cy
          .wrap($ionInput)
          .find('input')
          .type(text,{force:true})
          .then(() => $ionInput);
      }
    );
  }

  public clear(selector: SupportedSelectors<HTMLIonInputElement>) {
    return getFromSupportedSelector<HTMLIonInputElement>(selector).then(
      ($ionInput) => {
        return cy
          .wrap($ionInput)
          .find('input')
          .clear()
          .then(() => $ionInput);
      }
    );
  }
}

export const ionInputCypress = new IonInputCypress();
