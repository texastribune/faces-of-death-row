/**
 * Returns a basic `requestAnimationFrame` polyfill, if needed. Call whenever
 * you would normally use `window.requestAnimationFrame`.
 *
 * @private
 * @type {Function}
 */
function raf () {
  var win = window;

  return win.requestAnimationFrame ||
  win.webkitRequestAnimationFrame ||
  win.mozRequestAnimationFrame ||
  function (cb) {
    win.setTimeout(cb, 1000 / 60);
  };
}

export default raf(); // singleton
