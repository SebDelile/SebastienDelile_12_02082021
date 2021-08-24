import * as d3 from 'd3';

/**
 * A function to make the digit to animate from a starting value to an ending value
 * @memberof utils
 * @param {d3Element} target - a node selected with the d3.select() method, this node will contain the animated digit (and only it)
 * @param {number} startValue - the value from where to start the animation
 * @param {number} endValue  - the value where the animation ends
 * @param {number} step - the step to round the values for each increment
 * @param {object} LOADING_TRANSITION_SETTINGS - the settings of the transition, must contain a key duration and a key ease
 * @param {function} formatResult - a function to give the displayed value a certain format, if not specified, no format is given (default a=>a)
 */
const animateDigits = (
  target,
  startValue,
  endValue,
  step,
  LOADING_TRANSITION_SETTINGS,
  formatResult = (a) => a
) => {
  target
    .text(startValue)
    .transition()
    .duration(LOADING_TRANSITION_SETTINGS.duration)
    .ease(LOADING_TRANSITION_SETTINGS.ease)
    .tween('', () => {
      let i = d3.interpolateRound(target.text(), endValue);
      return (t) => {
        target.text(
          t === 1
            ? formatResult(endValue)
            : formatResult(Math.floor(i(t) / step) * step)
        );
      };
    });
};

export default animateDigits;
