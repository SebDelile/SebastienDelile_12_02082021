/**
 * a function to delete the js error when manipulation decimal number (ie 0.1 + 0.2 != 0.3). It deletes the decimals after the 12th
 * @memberof utils
 * @param {number} number the number to correct
 * @returns {number} the corrected number
 */
const fixJSfloatError = (number) => parseFloat(number.toFixed(12));

export default fixJSfloatError;
