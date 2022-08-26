/**
 * igloo web JS
 * ------------
 * Author: Aditya Wikardiyan - @aditatsintask
 * Github: https://github.com/aditAtSinTask/igloo-web-js
 */

// To get parameter by URL query string name
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Request API with loadXHR function
function loadXHR(url, method, send, responseType, requestHeader) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    if (typeof method !== "string") {
      method = "GET";
    }

    if (typeof responseType !== "string") {
      /** List of valid responseType
       * ---------------------------
        "",
        "arraybuffer",
        "blob",
        "document",
        "json",
        "text"
      */
      responseType = "json";
    }

    if (typeof requestHeader !== "object") {
      requestHeader = [
        {
          param: "Content-type",
          value: "application/json",
        },
      ];
    }

    xhr.responseType = responseType;
    xhr.open(method.toUpperCase(), url, true);

    requestHeader.map((data) => {
      xhr.setRequestHeader(data.param, data.value);
    });

    xhr.onload = () => {
      resolve(xhr);
    };

    if (!!send) {
      xhr.send(send);
    } else {
      xhr.send();
    }
  });
}

// Change from object to form-urlencoded
function convertToFormURLEncoded(object) {
  if (typeof object === "object") {
    let result = "";
    object.map((data, index) => {
      if (index > 0) {
        result = result + "&" + `${data.param}=${data.value}`;
      } else {
        result = `${data.param}=${data.value}`;
      }
    });

    return result;
  } else {
    return "Param is not object";
  }
}

// Random generator
function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomRangeInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Hide/show element
function displayElementById(id, status) {
  let displayStatus = "display: block;";
  if (status === "hide") {
    displayStatus = "display: none;";
  }

  if (!!document.getElementById(id)) {
    document.getElementById(id).style = displayStatus;
  }
}

function displayElementByQuerySelector(selector, status) {
  let displayStatus = "display: block;";
  if (status === "hide") {
    displayStatus = "display: none;";
  }

  if (!!document.querySelector(selector)) {
    document.querySelector(selector).style = displayStatus;
  }
}

// Detect space
function ctypeSpace(input) {
  return input.replace(/\s/g, "").length > 0;
}

// BasicMD - Convert to Basic MarkDown
function convertToBasicMD(input, changeTo) {
  input = input
    .replace(/^<([^>]+)>/g, "")
    .replace(/^<br>/g, "")
    .replace(/<br>/g, "<>")
    .replace(/(<\/([^>]+)>)/g, "")
    .replace(/(<([^>]+)>)/g, "<>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/<>/g, changeTo);

  if (!this.ctypeSpace(input.replace(/(<([^>]+)>)/g, ""))) {
    input = "";
  }

  return input;
}

function basicMD(id) {
  const element = document.getElementById(id);
  if (!!element) {
    const getElemValue = element.innerHTML;
    const elemValueConvert = convertToBasicMD(getElemValue);
    element.innerHTML = `<pre>${elemValueConvert}</pre>`;
  }
}

// Load script with path
function loadExternalScript(path) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = "blob";

    if (path.substr(0, 4).toUpperCase() === "URL:") {
      xhr.open("GET", `http${path.substr(8)}`, true);
    } else {
      xhr.open("GET", `/assets/js/${path}`, true);
    }

    xhr.onload = function () {
      const script = document.createElement("script");
      const src = URL.createObjectURL(xhr.response);
      const sourceId = `exjs-${randomString(15)}`;

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

// Load style with path
function loadExternalStyle(path) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = "blob";

    if (path.substr(0, 4).toUpperCase() === "URL:") {
      xhr.open("GET", `http${path.substr(8)}`, true);
    } else {
      xhr.open("GET", `/assets/css/${path}`, true);
    }

    xhr.onload = function () {
      const style = document.createElement("link");
      const src = URL.createObjectURL(xhr.response);
      const sourceId = `excss-${randomString(15)}`;

      style.href = src;
      style.rel = "stylesheet";
      style.type = "text/css";
      style.id = sourceId;
      document.body.appendChild(style);

      resolve(true);
    };
    xhr.send();
  });
}

// Storage service - Fork from our Selteer Project (selteer.com/about)
class StorageService {
  static variableStorage;
  dataStorage;

  constructor() {
    StorageService.variableStorage = [];

    const defaultName = "storage-service";
    let storageName = localStorage.getItem("initStorageService");
    let storageNameSession = sessionStorage.getItem("initStorageService");

    if (storageName !== storageNameSession) {
      let validOne = false;
      let validTwo = false;

      try {
        JSON.parse(storageName);
        validOne = true;
      } catch (_) {
        validOne = false;
      }

      try {
        JSON.parse(storageNameSession);
        validTwo = true;
      } catch (_) {
        validTwo = false;
      }

      if (validOne && !validTwo) {
        storageNameSession = storageName;
      } else if (!validOne && validTwo) {
        storageName = storageNameSession;
      }
    }

    if (!!storageName) {
      let thisStorageName;
      try {
        thisStorageName = JSON.parse(storageName);
      } catch (_) {
        console.error(
          "Storage name not found, please define the storage name first"
        );
      }

      if (!!thisStorageName.name) {
        this.dataStorage = thisStorageName;
      } else {
        console.error(
          "Storage name not found, please define the storage name first"
        );
      }
    } else {
      this.dataStorage = { name: defaultName };
      localStorage.setItem(
        "initStorageService",
        JSON.stringify({ name: defaultName })
      );
      sessionStorage.setItem(
        "initStorageService",
        JSON.stringify({ name: defaultName })
      );
    }
  }

  get(name, testReject) {
    return new Promise((resolve, reject) => {
      if (testReject) {
        reject(
          new Error(`Storage rejection test, testReject parameter is true`)
        );
        return;
      }

      const getData = localStorage.getItem(`${this.dataStorage.name}.${name}`);
      if (!!getData) {
        let response;
        try {
          response = JSON.parse(getData);
        } catch (_) {
          response = getData;
        }
        resolve(response);
      } else {
        resolve(null);
      }
    });
  }

  set(name, data, testReject) {
    return new Promise((resolve, reject) => {
      if (testReject) {
        reject(
          new Error(`Storage rejection test, testReject parameter is true`)
        );
        return;
      }

      if (typeof data === "object") {
        try {
          const stringifyData = JSON.stringify(data);
          localStorage.setItem(
            `${this.dataStorage.name}.${name}`,
            stringifyData
          );
          resolve(true);
        } catch (_) {
          console.error(_);
          reject(new Error(`Can't save the data to storage`));
        }
      } else {
        localStorage.setItem(`${this.dataStorage.name}.${name}`, data);
        resolve(true);
      }
    });
  }

  remove(name, testReject) {
    return new Promise((resolve, reject) => {
      if (testReject) {
        reject(
          new Error(`Storage rejection test, testReject parameter is true`)
        );
        return;
      }

      try {
        localStorage.removeItem(`${this.dataStorage.name}.${name}`);
        resolve(true);
      } catch (_) {
        console.error(_);
        reject(new Error(`Can't remove the data from storage`));
      }
    });
  }
}

// IndexedDB Storage - Fork from our Selteer Project (selteer.com/about)
class DBStorageService {
  constructor() {
    DBStorageService.variableStorage = [];
    const defaultName = "selteer-db-storage";
    const indexedDBAvailable = "indexedDB" in window;
    if (!indexedDBAvailable) {
      console.error("SeltDBStorage Error: IndexedDB not supported");
    }
    const openReq = indexedDB.open(defaultName, 1);
    openReq.onupgradeneeded = (e) => {
      const currentDb = e.target.result;
      if (!currentDb.objectStoreNames.contains("content")) {
        currentDb.createObjectStore("content", { keyPath: "id" });
      }
    };
    openReq.onsuccess = (e) => {
      this.thisDb = e.target.result;
    };
    openReq.onerror = (e) => {
      console.error("SeltDBStorage Error: IndexedDB init error: ", e);
    };
  }

  get(id, db, testReject) {
    if (!!this.thisDb) {
      return new Promise((resolve, reject) => {
        if (testReject) {
          reject(
            new Error(`Storage rejection test, testReject parameter is true`)
          );
          return;
        }
        const transaction = this.thisDb.transaction(db, "readwrite");
        const dataDb = transaction.objectStore(db);
        try {
          const dbGet = dataDb.get(id);
          dbGet.onsuccess = () => {
            resolve(dbGet.result);
          };
          dbGet.onerror = (e) => {
            reject(new Error(`SeltDBStorage Error: ${e}`));
          };
        } catch (e) {
          reject(new Error(`SeltDBStorage Error: ${e}`));
        }
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.get(id, db, testReject));
        }, 100);
      });
    }
  }

  getAll(db, testReject) {
    if (!!this.thisDb) {
      return new Promise((resolve, reject) => {
        if (testReject) {
          reject(
            new Error(`Storage rejection test, testReject parameter is true`)
          );
          return;
        }
        const transaction = this.thisDb.transaction(db, "readwrite");
        const dataDb = transaction.objectStore(db);
        try {
          const dbGet = dataDb.getAll();
          dbGet.onsuccess = () => {
            resolve(dbGet.result);
          };
          dbGet.onerror = (e) => {
            reject(new Error(`SeltDBStorage Error: ${e}`));
          };
        } catch (e) {
          reject(new Error(`SeltDBStorage Error: ${e}`));
        }
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getAll(db, testReject));
        }, 100);
      });
    }
  }

  set(id, data, db, testReject) {
    if (!!this.thisDb) {
      return new Promise((resolve, reject) => {
        if (testReject) {
          reject(
            new Error(`Storage rejection test, testReject parameter is true`)
          );
          return;
        }
        let dataSave = {};
        if (typeof data !== "object") {
          data = JSON.parse(data);
        }
        const transaction = this.thisDb.transaction(db, "readwrite");
        const dataDb = transaction.objectStore(db);
        const dbGet = dataDb.get(id);
        let addData = [];
        dbGet.onsuccess = () => {
          if (!!dbGet.result) {
            addData = dbGet.result.container;
          }
          dataSave = {
            id: id,
            container: [...addData, data],
          };
          const deleteData = dataDb.delete(id);
          deleteData.onsuccess = () => {
            const req = dataDb.add(dataSave);
            req.onsuccess = () => {
              resolve(true);
            };
            req.onerror = (e) => {
              reject(
                new Error(
                  `SeltDBStorage Error: Can't save data to DB, Final process failed\n${e}`
                )
              );
            };
          };
          deleteData.onerror = (e) => {
            reject(
              new Error(
                `SeltDBStorage Error: Can't get data from DB, [1] Delete process failed\n${e}`
              )
            );
          };
        };
        dbGet.onerror = (e) => {
          reject(
            new Error(
              `SeltDBStorage Error: Can't get data from DB, [0] Set process failed\n${e}`
            )
          );
        };
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.set(id, data, db, testReject));
        }, 100);
      });
    }
  }

  remove(id, db, testReject) {
    if (!!this.thisDb) {
      return new Promise((resolve, reject) => {
        if (testReject) {
          reject(
            new Error(`Storage rejection test, testReject parameter is true`)
          );
          return;
        }
        const transaction = this.thisDb.transaction(db, "readwrite");
        const dataDb = transaction.objectStore(db);
        try {
          const deleteData = dataDb.delete(id);
          deleteData.onsuccess = () => {
            resolve(true);
          };
          deleteData.onerror = (e) => {
            reject(
              new Error(`SeltDBStorage Error: Can't delete data from DB\n${e}`)
            );
          };
        } catch (e) {
          reject(new Error(`SeltDBStorage Error: ${e}`));
        }
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.remove(id, db, testReject));
        }, 100);
      });
    }
  }
}
