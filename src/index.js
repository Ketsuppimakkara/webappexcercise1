import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const root = document.getElementById("app");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  root.appendChild(container);
  addWikiItem(container, "Corgi");
  addWikiItem(container, "Rottweiler");
  addWikiItem(container, "Bulldog");
  addWikiItem(container, "Collie");
  addWikiItem(container, "Beagle");
}

async function addWikiItem(root, breed) {
  const newDiv = document.createElement("div");

  let imageUrl =
    "https://dog.ceo/api/breed/" + breed.toLowerCase() + "/images/random";
  let imagePromise = await fetch(imageUrl);
  let imageJSON = await imagePromise.json();
  let imgSRC = imageJSON.message;

  let textUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    breed.toLowerCase() +
    "?redirect=true";
  let textPromise = await fetch(textUrl);
  let textJSON = await textPromise.json();
  const text = textJSON.extract;

  newDiv.setAttribute("class", "wiki-item");
  newDiv.innerHTML =
    '<h1 class="wiki-header">' +
    breed +
    "</h1>" +
    '<div class="wiki-content">' +
    '<p class="wiki-text">' +
    text +
    "</p>" +
    '<div class="img-container">' +
    '<img class="wiki-img" src="' +
    imgSRC +
    '">' +
    "</div>" +
    "</div>" +
    "</div>";
  root.appendChild(newDiv);
}
