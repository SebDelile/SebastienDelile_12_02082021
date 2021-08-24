/**
 * a function to format a number with a coma as thousand separator
 * @memberof utils
 * @param {number} number - the number to format
 * @returns {string} the formated number
 */
const putThousandSeparator = (number) => {
  const numberAsString = number.toString().split('.');
  const IntegerAsArray = numberAsString[0].split('');
  const IntegerAsArrayWithSeparator = IntegerAsArray.reverse()
    .map((digit, index) =>
      index % 3 === 0 && index !== 0 ? `${digit},` : digit
    )
    .reverse();
  return numberAsString[1]
    ? `${IntegerAsArrayWithSeparator.join('')}.${numberAsString[1]}`
    : IntegerAsArrayWithSeparator.join('');
};

export default putThousandSeparator;
