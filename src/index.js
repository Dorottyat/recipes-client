// server=localhost:8080
// client=localhost:5500

let nameInput = document.querySelector("#nameInput");
let servingInput = document.querySelector("#servingInput");
let timeInput = document.querySelector("#timeInput");
let noteInput = document.querySelector("#noteInput");
let createRecipeBtn = document.querySelector("#createRecipeBtn");
let recipesDiv = document.querySelector("#recipesDiv");

createRecipeBtn.addEventListener("click", postRecipe);

init();

function postRecipe() {
  fetch("http://localhost:8080/recipes", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createRecipe()),
  });

  window.location.reload();
}

function getRecipes() {
  fetch("http://localhost:8080/recipes")
    .then((res) => res.json())
    .then((data) => showRecipes(data));
}

function createRecipe() {
  return {
    name: nameInput.value,
    serving: servingInput.value,
    time: timeInput.value,
    ingredients: ["tojas", "kenyer"],
    directions: ["fozd meg a tojast", "edd meg a asdasdasd"],
    note: noteInput.value,
  };
}

function showRecipes(data) {
  data.forEach((recipe) => {
    recipesDiv.innerHTML += showRecipe(recipe);
  });
}

function showRecipe(recipe) {
  return `
    <div class="recipe">
      <h2 class="recipe-name">${recipe.name}</h2>
      <p class="recipe-serving">${recipe.serving}</p>
      <p class="recipe-time">${recipe.time}</p>
      <p class="recipe-note">${recipe.note}</p>
      <ul class="recipe-ingredients"></ul>
      <ol class="recipe-directions"></ol>
    </div>
    `;
}

function init() {
  getRecipes();
}
