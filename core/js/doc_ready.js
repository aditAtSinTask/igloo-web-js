/**
 * igloo web JS
 * ------------
 * Author: Aditya Wikardiyan - @aditatsintask
 * Github: https://github.com/aditAtSinTask/igloo-web-js
 */

/**
 * Document Ready
 * --------------
 * To handle if HTML page is ready then we can load JS.
 * how to use docReady:
 *  - Call docReady function on our pages inside /assets/pages/{PAGE_NAME}/script.js
 *  - We can call docReady like this: 
 *    - docReady(() => { ... YOUR CODE ... }); 
 *    - or for async, 
 *    - docReady(async () => { ... YOUR CODE ... });
 */
(function (funcName, baseObj) {
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }
      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  }

  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }
    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      readyList.push({ fn: callback, ctx: context });
    }
    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  };
})("docReady", window);
