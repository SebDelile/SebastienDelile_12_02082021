/**
 * a function to evaluate a text, split it as several lines based on a maximum width, and append it to a target svg-text element.
 * @param {*} text - the text to evaluate
 * @param {*} target - a svg text element selected as d3 node
 * @param {*} maxWidth - the maximum width a line can be without carriage return
 */
export const appendMultilineSvgText = (text, target, maxWidth) => {
  const textAsArray = text.split(' ');

  target.selectAll('tspan').remove();

  const buildingLine = target.append('tspan');

  textAsArray.forEach((word) => {
    if (buildingLine.text() === '') {
      buildingLine.text(word);
      target.append('tspan').attr('dy', 0).attr('x', 0).text(word);
    } else {
      buildingLine.text(buildingLine.text() + ' ' + word);
      if (buildingLine.node().getBBox().width <= maxWidth) {
        target.select('tspan:last-of-type').text(buildingLine.text());
      } else {
        buildingLine.text(word);
        target.append('tspan').attr('dy', '1.2em').attr('x', 0).text(word);
      }
    }
  });
  buildingLine.remove();
};
