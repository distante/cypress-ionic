/**
 * @param {string} initialText
 * @returns a value to be checked on tests
 */
export function convertToTestString(initialText) {
  return `${initialText}__TEST-DONE-OK`;
}
