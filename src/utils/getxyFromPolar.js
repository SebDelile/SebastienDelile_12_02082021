/**
 * a function to transform polar coordinates (angle, distance) into cartesian coordinates (x, y)
 * @param {number} angle - the angle between the segment [origin - dataPoint] and the horizontal line (in deg)
 * @param {number} distance - the distance of the point from origin (already in scale if needed)
 * @param {object} origin - the x and y coordinate of the origin
 * @returns {object} a pair of x and y coordinate of the data point in the same referential as the origin
 */
export const getxyFromPolar = (angle, distance, origin) => {
  const angleRadian = (angle / 180) * Math.PI;
  return {
    x: Math.round(origin.x + Math.cos(angleRadian) * distance),
    y: Math.round(origin.y - Math.sin(angleRadian) * distance),
  };
};
