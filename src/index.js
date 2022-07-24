// server=localhost:8080
// client=localhost:5500

let nameInput = document.querySelector("#nameInput");
let servingInput = document.querySelector("#servingInput");
let timeInput = document.querySelector("#timeInput");
let noteInput = document.querySelector("#noteInput");
let createRecipeBtn = document.querySelector("#createRecipeBtn");
let recipesDiv = document.querySelector("#recipesDiv");
let ingredientList = document.querySelector("#ingredient-list");
let directionList = document.querySelector("#direction-list");

createRecipeBtn.addEventListener("click", postRecipe);
addIngredientBtn.addEventListener("click", () =>
  addToList("ingredient", ingredientList)
);
addDirectionBtn.addEventListener("click", () =>
  addToList("direction", directionList)
);

init();

function init() {
  getRecipes();
}

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

function showRecipes(data) {
  data.forEach((recipe) => {
    recipesDiv.innerHTML += showRecipe(recipe);
  });
}

function showRecipe(recipe) {
  return `
    <div class="recipe">
      <img src="../img/food.jpg" alt="food" />
      <div class="recipe-body">
        <h2 class="recipe-name">${recipe.name}</h2>
        <div class="recipe-badges">
          <p class="recipe-badge">${
            recipe.serving
          } <i class="fa-regular fa-clock"></i></p>
          <p class="recipe-badge">${
            recipe.time
          } <i class="fa-solid fa-bell-concierge"></i></p>
        </div>
        <h2>Ingredients</h2>
        <ul class="recipe-ingredients list">${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
        </ul>
        <h2>Directions</h2>
        <ol class="recipe-directions list">${recipe.directions
          .map((direction) => `<li>${direction}</li>`)
          .join("")}
        </ol>
        <h2>Notes</h2>
        <p class="recipe-note">${recipe.note}</p>
        <button onclick="deleteById(${
          recipe.id
        })"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
    `;
}

function deleteById(id) {
  fetch("http://localhost:8080/recipes/" + id, {
    method: "DELETE",
  });

  window.location.reload();
}

function createRecipe() {
  let ingredientInputs = document.querySelectorAll(".ingredient");
  let directionInputs = document.querySelectorAll(".direction");
  let ingredients = [];
  let directions = [];

  ingredientInputs.forEach((ingredientInput) => {
    ingredients.push(ingredientInput.value);
  });

  directionInputs.forEach((directionInput) => {
    directions.push(directionInput.value);
  });

  return {
    name: nameInput.value,
    serving: servingInput.value,
    time: timeInput.value,
    ingredients: ingredients,
    directions: directions,
    note: noteInput.value,
  };
}

function addToList(inputClassName, htmlList) {
  const input = document.createElement("input");
  input.className = inputClassName;

  const li = document.createElement("li");

  li.appendChild(input);
  htmlList.appendChild(li);
}
