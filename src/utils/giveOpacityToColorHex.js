/**
 * transform a color in the form #000000 in the form rgba(0, 0, 0, opacity) with opacity the second parameter
 * @memberof utils
 * @param {string} colorHex - a color in the hexadecimal format like #012345
 * @param {number} opacity - the opacity value to set, range from 0 to 1
 * @returns {string} - a rgba() color corresponding to the hex color with the required opacity
 */
const giveOpacityToColorHex = (colorHex, opacity) => {
  const splitedColorHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    colorHex
  );
  return splitedColorHex
    ? `rgba(${parseInt(splitedColorHex[1], 16)}, ${parseInt(
        splitedColorHex[2],
        16
      )}, ${parseInt(splitedColorHex[3], 16)}, ${opacity})`
    : null;
};

export default giveOpacityToColorHex;
