import { IonRange } from '@ionic/core/components/ion-range';
import { RangeValue } from '@ionic/core/dist/types/interface';

type GenericIonRange<T> = IonRange & {
  value: T;
};

interface IonRangeObjectValue {
  upper: number;
  lower: number;
}

enum RangeKnobSelector {
  Single = '.range-knob-handle.range-knob-a',
  Lower = '.range-knob-handle.range-knob-a',
  Upper = '.range-knob-handle.range-knob-b',
}

/**
 * Sets the value or the {@link IonRange} programmatically and triggers
 * their `ionChangeEvent`. Use this is if middle events are not important
 * to your application.
 */
function setValue(ionCssSelector: string, value: RangeValue) {
  return cy.get(ionCssSelector).then((ionRange$) => {
    const ionRange = ionRange$[0] as IonRange;
    ionRange.value = value;
    const event = new CustomEvent('ionChange', { detail: value });
    ionRange.dispatchEvent(event);
  });
}

/**
 * Will move the {@link IonRange} value one by one (uses key events)
 */
function moveToValue(
  ionCssSelector: string,
  targetValue: RangeValue
): Cypress.Chainable<JQuery<IonRange>> {
  return cy.get(ionCssSelector).then((ionRange$) => {
    const ionRange = ionRange$[0] as IonRange;

    if (typeof targetValue === 'number') {
      return moveToNumberValue({
        ionRange,
        targetValue,
        currentValue: ionRange.value as number,
        knobSelector: RangeKnobSelector.Single,
      });
    }

    return moveToObjectValue(
      ionRange as GenericIonRange<IonRangeObjectValue>,
      targetValue as IonRangeObjectValue
    );
  });
}

function moveToNumberValue({
  ionRange,
  targetValue,
  currentValue,
  knobSelector,
}: {
  ionRange: IonRange;
  targetValue: number;
  currentValue: number;
  knobSelector: RangeKnobSelector;
}): Cypress.Chainable<JQuery<IonRange>> {
  if (currentValue === targetValue) {
    return cy.wrap(ionRange);
  }

  const handle = ionRange.shadowRoot?.querySelector(knobSelector);

  if (!handle) {
    return cy
      .wait(100)
      .then(() =>
        moveToNumberValue({ ionRange, targetValue, currentValue, knobSelector })
      );
  }

  const stepAttribute = ionRange.getAttribute('step');
  const step = stepAttribute ? parseInt(stepAttribute, 10) : 1;

  const move = currentValue > targetValue ? '{leftarrow}' : '{rightarrow}';
  const totalMoves = Math.abs(currentValue - targetValue) / step;
  const finalMovesString = move.repeat(totalMoves);

  return cy
    .wrap(handle)
    .log(
      `setting ionRange (knob: ${knobSelector}) from ${currentValue} to ${targetValue} (total moves : ${totalMoves})`
    )
    .type(finalMovesString, { force: true, delay: 100 })
    .then(() => {
      /**
       * There is a problem where for dual knobs the first "rightarrow" move
       * does not work. So for now I will do a double check...
       */
      const neededObject = getFixTargetValue(
        ionRange,
        knobSelector,
        targetValue
      );
      if (neededObject) {
        return cy.log('target value not arrived, fixing it').then(() =>
          moveToNumberValue({
            ionRange,
            targetValue: neededObject.targetValue,
            currentValue: neededObject.currentValue,
            knobSelector,
          })
        );
      }

      return cy.wrap(ionRange);
    });
}

function moveToObjectValue(
  ionRange: GenericIonRange<IonRangeObjectValue>,
  targetValue: IonRangeObjectValue
): Cypress.Chainable<JQuery<IonRange>> {
  const cypressFunctions: Array<() => Cypress.Chainable<JQuery<IonRange>>> = [];

  if (ionRange.value.upper !== targetValue.upper) {
    cypressFunctions.push(() =>
      moveToNumberValue({
        ionRange,
        targetValue: targetValue.upper,
        currentValue: ionRange.value.upper as number,
        knobSelector: RangeKnobSelector.Upper,
      })
    );
  }

  if (ionRange.value.lower !== targetValue.lower) {
    cypressFunctions.push(() =>
      moveToNumberValue({
        ionRange,
        targetValue: targetValue.lower,
        currentValue: ionRange.value.lower,
        knobSelector: RangeKnobSelector.Lower,
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

function getFixTargetValue(
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

export const ionRangeCypress = { setValue, moveToValue };
