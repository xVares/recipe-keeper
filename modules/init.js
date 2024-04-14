import { RecipeFormManager } from "./recipeFormManager.js";

const apiUrl = "http://127.0.0.1:8000/recipes";

const styleSwitcher = document.getElementById("style-switcher");

// Get all form elements
const formTitle = document.getElementById("h2");
const recipeForm = document.getElementById("recipe-form");
const recipeId = document.getElementById("recipe-id");
const recipeName = document.getElementById("recipe-form-name");
const ingredients = document.getElementById("recipe-form-ingredients");
const steps = document.getElementById("recipe-form-steps");
const recipeImg = document.getElementById("recipe-form-img");
const submitButton = document.getElementById("submit-button");

const defaultRecipeImgUrl = "..\\images\\recipe-default-img.jpg";

const recipeFormManager = new RecipeFormManager(submitButton);

export { styleSwitcher, apiUrl, formTitle, recipeForm, recipeId, recipeName, ingredients, steps, recipeImg, submitButton, defaultRecipeImgUrl, recipeFormManager };