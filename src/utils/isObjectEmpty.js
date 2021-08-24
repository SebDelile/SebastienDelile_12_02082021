/**
 * test if the object is empty or not
 * @memberof utils
 * @param {object} object - the object to test
 * @returns {boolean} - true is empty, false if there is at least one key
 */
const isObjectEmpty = (object) =>
  Object.getOwnPropertyNames(object).length === 0;

export default isObjectEmpty;
