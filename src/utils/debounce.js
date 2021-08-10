export function debounce(callback, delay) {
  let debounceTimer = null;
  return function () {
    let args = arguments;
    let context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
}
