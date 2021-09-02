import * as d3 from 'd3';
import fixJSfloatError from './fixJSfloatError';

/**
 * take the serie and calculate a wider domain than the .nice() d3 method. It especially avoids a data to be equal to the minimum of the domain and so the corresponding bar to be 0px height
 * @memberof utils
 * @param {boolean} isFromZero - true if the serie has to be displayed from 0, false otherwise
 * @param {array} data - the data array used to make the domain
 * @param {number} stepsNumber - the required number of steps (one could be automatically added to display more nicely the minimum data)
 * @returns {object} - object with the values for the minimum of the domain, the maximum of the domain, the step value and the ticks values
 */
const setNiceDomain = (isFromZero, data, stepsNumber) => {
  const max = d3.max(data);
  const min = isFromZero ? 0 : d3.min(data);

  const delta = max - min;
  const step = delta / stepsNumber;

  const rounder = 10 ** Math.floor(Math.log10(step));
  const stepRounded = fixJSfloatError(Math.ceil(step / rounder) * rounder);

  const isAdditionnalStep =
    min - Math.floor(min / stepRounded) * stepRounded <= stepRounded / 3
      ? true
      : false;

  const minRounded = fixJSfloatError(
    isFromZero
      ? 0
      : (Math.floor(min / stepRounded) - isAdditionnalStep) * stepRounded
  );
  const maxRounded = fixJSfloatError(
    Math.ceil(max / stepRounded) * stepRounded
  );

  const ticksValues = new Array(stepsNumber + 1 + isAdditionnalStep)
    .fill(null)
    .map((value, index) => fixJSfloatError(minRounded + index * stepRounded));

  return {
    minRounded: minRounded,
    maxRounded: maxRounded,
    stepRounded: stepRounded,
    ticksValues: ticksValues,
  };
};

export default setNiceDomain;
