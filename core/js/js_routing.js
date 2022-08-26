/**
 * igloo web JS
 * ------------
 * Author: Aditya Wikardiyan - @aditatsintask
 * Github: https://github.com/aditAtSinTask/igloo-web-js
 */

// JS Routing
let loopRoute;
loopRoute = setInterval(() => {
  if (!!docReady) {
    clearInterval(loopRoute);
    docReady(async () => {
      displayElementByQuerySelector("igloo-web-root", "hide");
      displayElementByQuerySelector("#loadingContent", "show");

      // Init
      function loadRoot() {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = async function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const content = document.querySelector("igloo-web-root");
            content.innerHTML = xhr.responseText;

            // Load pages
            const pathname = document.location.pathname
              .substr(1)
              .split("/")
              .join("|");
            await loadCustomScript("/assets/js/global.js");
            loadPages(pathname);
          } else if (xhr.readyState == 4 && xhr.status == 404) {
            loadPages("notfound");
          }
        };

        xhr.open("GET", `/assets/root/root.html`, true);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.send();
      }

      function loadPages(path) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const content = document.querySelector("igloo-web-container");
            content.innerHTML = xhr.responseText;
            loadScript(path);
          } else if (xhr.readyState == 4 && xhr.status == 404) {
            loadPages("notfound");
          }
        };

        xhr.open("GET", `/assets/pages/${path}/web.html`, true);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.send();
      }

      function loadScript(path) {
        try {
          const xhr = new XMLHttpRequest();

          xhr.responseType = "blob";
          xhr.open("GET", `/assets/pages/${path}/script.js`, true);
          xhr.onload = function () {
            const script = document.createElement("script");
            const src = URL.createObjectURL(xhr.response);

            script.src = src;
            script.onload = () => {
              loadStyle(path);
            };
            document.body.appendChild(script);
          };
          xhr.send();
        } catch (e) {}
      }

      function loadStyle(path) {
        try {
          const xhr = new XMLHttpRequest();

          xhr.responseType = "blob";
          xhr.open("GET", `/assets/pages/${path}/style.css`, true);
          xhr.onload = function () {
            const style = document.createElement("link");
            const src = URL.createObjectURL(xhr.response);

            style.href = src;
            style.rel = "stylesheet";
            style.type = "text/css";
            document.body.appendChild(style);

            displayElementByQuerySelector("igloo-web-root", "show");
            displayElementByQuerySelector("#loadingContent", "hide");
          };
          xhr.send();
        } catch (e) {}
      }

      function loadCustomScript(path) {
        return new Promise((resolve) => {
          const xhr = new XMLHttpRequest();

          xhr.responseType = "blob";
          xhr.open("GET", path, true);
          xhr.onload = function () {
            const script = document.createElement("script");
            const src = URL.createObjectURL(xhr.response);
            const sourceId = `csjs-${randomString(15)}`;

            script.src = src;
            script.id = sourceId;
            script.onload = () => {
              resolve(true);
            };
            document.body.appendChild(script);
          };
          xhr.send();
        });
      }

      // Run
      loadRoot();
    });
  }
}, 10);
