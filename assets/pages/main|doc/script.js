docReady(async () => {
  await loadExternalScript("external/marked.min.js");
  await loadExternalStyle("external/external.css");

  function fullMD(id) {
    const element = document.getElementById(id);
    if (!!element) {
      const getElemValue = element.innerHTML;
      const elemValueConvert = marked(getElemValue);
      element.innerHTML = elemValueConvert;
    }
  }

  // Convert to markdown
  fullMD("markdown1");

  // API Request (Dummy)
  let callAPI = false;
  document
    .getElementById("callResponseAPI")
    .addEventListener("click", async () => {
      if (!callAPI) {
        callAPI = true;
        const responseFromAPI = await loadXHR(
          "https://jsonplaceholder.typicode.com/posts",
          "POST",
          JSON.stringify({
            title: "iglooWebJS",
            body: "Just simple XHR request",
            userId: randomString(20),
          }),
          "json",
          [
            {
              param: "Content-type",
              value: "application/json; charset=UTF-8",
            },
          ]
        );
        if (responseFromAPI.status > 199 && responseFromAPI.status < 300) {
          document.getElementById("responseAPI").innerHTML = JSON.stringify(
            responseFromAPI.response
          );
        } else {
          callAPI = false;
        }
      }
    });

  // Random String
  document
    .getElementById("callGenerateRandomString")
    .addEventListener("click", () => {
      document.getElementById("generateRandomString").innerHTML =
        randomString(20);
    });
});
