export const putThousandSeparator = (number) => {
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
