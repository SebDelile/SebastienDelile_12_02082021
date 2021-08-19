import * as d3 from 'd3';

export const animateDigits = (
  target,
  startValue,
  endValue,
  step,
  transitionSettings,
  formatResult = (a) => a
) => {
  target
    .text(startValue)
    .transition()
    .duration(transitionSettings.duration)
    .ease(transitionSettings.ease)
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
