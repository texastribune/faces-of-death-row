/**
 * A helper for asynchronously loading scripts.
 *
 * Provides a callback interface for passing a function that will only be called
 * if the script is successfully added to the page.
 *
 * @private
 * @param {String} url The URL for the script to be loaded.
 * @param {Function} [cb] A function to be called once the script successfully
 * loads. Not required.
 * @returns {void}
 * @example
 *
 * loadScript('backup.js', function () {
 *   // anything that depends on that script loading
 * });
 */
function loadScript (url, cb) {
  // create the `script` element
  var script = document.createElement('script');

  // set its URL
  script.src = url;

  // if there is a supplied callback, add it to `onload`
  if (cb) script.onload = cb;

  // attach the script to the document body
  document.body.appendChild(script);
}

export default loadScript;
