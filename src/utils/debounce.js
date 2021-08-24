/**
 * a debounce function to avoid multiple call of a function
 * @memberof utils
 * @param {function} callback - the function to call when there is no more call during the delay period
 * @param {number} delay - the delay to wait until there is no new call
 * @returns {function} the callback within a timeout
 */
const debounce = (callback, delay) => {
  let debounceTimer = null;
  return function () {
    let args = arguments;
    let context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
};

export default debounce;
