import { IonRange } from '@ionic/core/components/ion-range';
import {
  RangeChangeEventDetail,
  RangeValue,
} from '@ionic/core/dist/types/interface';

import {
  CypressIonicComponentClass,
  CypressIonicReturn,
  SupportedSelectors,
} from '@interfaces';
import { getFromSupportedSelector } from '@helpers';

type GenericIonRange<T> = IonRange & {
  value: T;
};

interface IonRangeObjectValue {
  upper: number;
  lower: number;
}

/** @internal */
enum RangeKnobSelector {
  Single = '.range-knob-handle.range-knob-a',
  Lower = '.range-knob-handle.range-knob-a',
  Upper = '.range-knob-handle.range-knob-b',
}

export interface IonRangeCypressMoveToValueOptions<T = RangeValue> {
  targetValue: T;
}

class IonRangeCypress
  implements CypressIonicComponentClass<IonRangeCypress, IonRange>
{
  /**
   * Sets the value or the {@link IonRange} programmatically and triggers
   * their `ionChangeEvent`. Use this is if middle events are not important
   * to your application.
   */
  public setValue(
    ionCssSelector: SupportedSelectors,
    value: RangeValue
  ): CypressIonicReturn<IonRange> {
    return getFromSupportedSelector<IonRange>(ionCssSelector).then(
      ($ionRange) => {
        const ionRange = $ionRange[0];

        value = this.normalizeRangeValue(value, ionRange);

        ionRange.value = value;
        const detail: RangeChangeEventDetail = { value };
        const event = new CustomEvent('ionChange', { detail });

        /**
         * This is not direct tested, but it is needed for angular events.
         */
        ionRange.dispatchEvent(event);

        return cy.wrap($ionRange);
      }
    );
  }

  /**
   * Will move the {@link IonRange} value one by one (uses key events),
   * If the target value exceeds the {@link IonRange.min min} or {@link IonRange.max max}
   * values they will be used as target.
   *
   * For example, asking this function to move to `200` when  the {@link IonRange.max max} value
   * is `150` will move the knob until `150`.
   */
  public moveToValue(
    ionCssSelector: SupportedSelectors,
    options: IonRangeCypressMoveToValueOptions
  ): CypressIonicReturn<IonRange> {
    return getFromSupportedSelector(ionCssSelector).then(($ionRange) => {
      const ionRange = $ionRange[0] as IonRange;

      options.targetValue = this.normalizeRangeValue(
        options.targetValue,
        ionRange
      );
      if (this.isOptionNumber(options)) {
        return this.moveToNumberValue({
          ionRange,
          options,
          currentValue: ionRange.value as number,
          knobSelector: RangeKnobSelector.Single,
        });
      }

      return this.moveToObjectValue(
        ionRange as GenericIonRange<IonRangeObjectValue>,
        options as IonRangeCypressMoveToValueOptions<IonRangeObjectValue>
      );
    });
  }

  private moveToNumberValue({
    ionRange,
    currentValue,
    knobSelector,
    options,
  }: {
    ionRange: IonRange;
    currentValue: number;
    knobSelector: RangeKnobSelector;
    options: IonRangeCypressMoveToValueOptions<number>;
  }): CypressIonicReturn<IonRange> {
    if (currentValue === options.targetValue) {
      return cy.wrap(ionRange);
    }

    const handle = ionRange.shadowRoot?.querySelector(knobSelector);

    if (!handle) {
      return cy.wait(100).then(() =>
        this.moveToNumberValue({
          ionRange,
          currentValue,
          knobSelector,
          options,
        })
      );
    }

    const stepAttribute = ionRange.getAttribute('step');
    const step = stepAttribute ? parseInt(stepAttribute, 10) : 1;

    const move =
      currentValue > options.targetValue ? '{leftarrow}' : '{rightarrow}';
    const totalMoves = Math.abs(currentValue - options.targetValue) / step;
    const finalMovesString = move.repeat(totalMoves);

    return cy
      .wrap(handle)
      .log(
        `setting ionRange (knob: ${knobSelector}) from ${currentValue} to ${options.targetValue} (total moves : ${totalMoves})`
      )
      .type(finalMovesString, { force: true, delay: 100 })
      .then(() => {
        /**
         * There is a problem where for dual knobs the first "rightarrow" move
         * does not work. So for now I will do a double check...
         */
        const neededObject = this.getFixTargetValue(
          ionRange,
          knobSelector,
          options.targetValue
        );
        if (neededObject) {
          return cy.log('target value not arrived, fixing it').then(() =>
            this.moveToNumberValue({
              ionRange,
              currentValue: neededObject.currentValue,
              knobSelector,
              options,
            })
          );
        }

        return cy.wrap(ionRange);
      });
  }

  private moveToObjectValue(
    ionRange: GenericIonRange<IonRangeObjectValue>,
    options: IonRangeCypressMoveToValueOptions<IonRangeObjectValue>
  ): Cypress.Chainable<JQuery<IonRange>> {
    const cypressFunctions: Array<() => Cypress.Chainable<JQuery<IonRange>>> =
      [];

    if (ionRange.value.upper !== options.targetValue.upper) {
      cypressFunctions.push(() =>
        this.moveToNumberValue({
          ionRange,
          currentValue: ionRange.value.upper as number,
          knobSelector: RangeKnobSelector.Upper,
          options: {
            ...options,
            targetValue: options.targetValue.upper,
          },
        })
      );
    }

    if (ionRange.value.lower !== options.targetValue.lower) {
      cypressFunctions.push(() =>
        this.moveToNumberValue({
          ionRange,
          currentValue: ionRange.value.lower,
          knobSelector: RangeKnobSelector.Lower,
          options: {
            ...options,
            targetValue: options.targetValue.lower,
          },
        })
      );
    }

    if (!cypressFunctions.length) {
      return cy.wrap(ionRange);
    }

    const cypressCall: () => Cypress.Chainable<JQuery<IonRange>> =
      cypressFunctions.reduce((prev, curr) => {
        return () => prev().then(() => curr());
      });

    return cypressCall().then(() => {
      cy.log(`ion range new value: ${JSON.stringify(ionRange.value)}`).wrap(
        ionRange
      );
    });
  }

  private getFixTargetValue(
    ionRange: IonRange,
    knobSelector: RangeKnobSelector,
    targetValue: number
  ): { targetValue: number; currentValue: number } | null {
    const currentValue = ionRange.value;
    if (typeof currentValue === 'number') {
      if (targetValue === currentValue) {
        return null;
      }

      return {
        targetValue,
        currentValue,
      };
    }

    return this.fixTargetValueForObjectValue(
      currentValue,
      knobSelector,
      targetValue
    );
  }

  private fixTargetValueForObjectValue(
    currentValue: IonRangeObjectValue,
    knobSelector: RangeKnobSelector,
    targetValue: number
  ): { targetValue: number; currentValue: number } | null {
    if (knobSelector === RangeKnobSelector.Lower) {
      if (currentValue.lower === targetValue) {
        return null;
      }

      return {
        targetValue,
        currentValue: currentValue.lower,
      };
    }

    if (currentValue.upper === targetValue) {
      return null;
    }

    return {
      targetValue,
      currentValue: currentValue.upper,
    };
  }

  private isOptionNumber(
    options: IonRangeCypressMoveToValueOptions
  ): options is IonRangeCypressMoveToValueOptions<number> {
    return typeof options.targetValue === 'number';
  }

  /** If the wanted value is big, just set it to the max allowed */
  private normalizeRangeValue(
    value: RangeValue,
    ionRange: IonRange
  ): RangeValue {
    if (typeof value === 'number') {
      return this.normalizeNumberValue(value, ionRange);
    }

    value.upper = this.normalizeNumberValue(value.upper, ionRange);
    value.lower = this.normalizeNumberValue(value.lower, ionRange);

    return value;
  }

  private normalizeNumberValue(value: number, ionRange: IonRange): number {
    if (value < ionRange.min) {
      cy.log(
        `${value} is below the accepted min, setting it to ${ionRange.min}`
      );
      value = ionRange.min;
    } else if (value > ionRange.max) {
      cy.log(
        `${value} is above the accepted max, setting it to ${ionRange.max}`
      );
      value = ionRange.max;
    }

    return value;
  }
}

export const ionRangeCypress = new IonRangeCypress();
