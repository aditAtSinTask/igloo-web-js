/**
 * Call external JS with loadExternalScript() function
 * ---
 * You can add .js file on external directory and
 * register it by call loadExternalScript(path);
 */

(async () => {
  await loadExternalScript('external/external.js');
  externalFunction('External function loaded');
})();