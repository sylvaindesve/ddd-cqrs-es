const app = document.querySelector("#root");

if (app) {
  fetch(`http://localhost:3000/api/v1`)
    .then((response) => response.json())
    .then((json) => {
      app.innerHTML = json.message;
    });
}
