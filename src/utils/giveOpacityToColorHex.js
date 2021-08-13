export const giveOpacityToColorHex = (colorHex, opacity) => {
  const splitedColorHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    colorHex
  );
  return splitedColorHex
    ? `
      rgba(${parseInt(splitedColorHex[1], 16)}, ${parseInt(
        splitedColorHex[2],
        16
      )}, ${parseInt(splitedColorHex[3], 16)}, ${opacity})
    `
    : null;
};
