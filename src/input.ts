function getNativeInput(ionCssSelector: string) {
  return cy.get(ionCssSelector).find('input');
}

function write(ionCssSelector: string, text: string) {
  return getNativeInput(ionCssSelector).type(text);
}

function clear(ionCssSelector: string) {
  return getNativeInput(ionCssSelector).clear();
}

export const ionInputCypress = { write, clear, getNativeInput };
