import { CypressIonicComponentClass, SupportedSelectors } from '@interfaces';
import { getFromSupportedSelector } from '@helpers';

class IonInputCypress
  implements CypressIonicComponentClass<IonInputCypress, HTMLInputElement>
{
  public write(selector: SupportedSelectors, text: string) {
    return getFromSupportedSelector<HTMLInputElement>(selector).then(
      ($ionInput) => {
        return cy
          .wrap($ionInput)
          .find('input')
          .type(text)
          .then(() => $ionInput);
      }
    );
  }

  public clear(selector: SupportedSelectors) {
    return getFromSupportedSelector<HTMLInputElement>(selector).then(
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
