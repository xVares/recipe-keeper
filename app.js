import { styleSwitcher, apiUrl, recipeForm, recipeId, recipeName, ingredients, steps, recipeImg, defaultRecipeImgUrl, recipeFormManager } from "./modules/init.js";
import { displayRecipes, fetchAllRecipes, addRecipes, updateRecipe } from "./modules/recipe-api.js";

// Validates that all required input fields are filled out.
function validateInputs() {
    if (!recipeName.value || !ingredients.value || !steps.value) {
        alert("Please fill in all fields.");
        throw new Error("Validation failed: Missing fields");
    }
}

// Depending on the form state, either updates an existing recipe or adds a new one.
async function performRecipeOperation() {
    const ingredientsList = ingredients.value.split(",")
        .map(ingredient => ingredient.trim()) // Remove whitespace from both ends of each ingredient.
        .filter(ingredient => ingredient !== ""); // Filter out empty strings.
    const imgValue = recipeImg.value || defaultRecipeImgUrl;

    if (recipeFormManager.isUpdating) {
        // If updating, create a recipe object with an ID
        const updatedRecipe = createRecipeObject(recipeId.value, recipeName.value, ingredientsList, steps.value, imgValue);
        await updateRecipeInDB(updatedRecipe);
        recipeFormManager.prepareFormForAdd(); // Reset form to 'add' state
    } else {
        // If adding a new recipe, create a recipe object without an ID
        const newRecipe = createRecipeObject(undefined, recipeName.value, ingredientsList, steps.value, imgValue);
        await addRecipeToDB(newRecipe); // Add the new recipe to the database
    }
}

// Helper function to create a recipe object.
function createRecipeObject(id, name, ingredients, steps, img) {
    return { id, name, ingredients, steps, img };
}

// Updates a recipe in the database and throws if the update is unsuccessful.
async function updateRecipeInDB(recipe) {
    const isUpdateSuccessful = await updateRecipe(apiUrl, recipe);
    if (isUpdateSuccessful === null) {
        throw new Error("Could not update recipe.");
    }
}

// Adds a new recipe to the database and throws if the operation fails.
async function addRecipeToDB(recipe) {
    const addedRecipeResult = await addRecipes(apiUrl, recipe);
    if (addedRecipeResult === null) {
        throw new Error("Could not add recipe to database");
    }
}

// Refreshes the display of recipes after any operation.
async function refreshRecipesDisplay() {
    const recipes = await fetchAllRecipes(apiUrl);
    if (recipes === null) {
        throw new Error("Failed to fetch recipes.");
    }
    await displayRecipes(recipes);
}

// Event listener for handling recipe form submissions.
recipeForm.addEventListener("submit", async (e) => {
    console.log("Form submit event triggered");
    e.preventDefault();
    try {
        validateInputs();
        await performRecipeOperation();
        await refreshRecipesDisplay();
    } catch (error) {
        console.error("Error occurred: ", error);
    }
});

// Event listener for toggling between light and dark themes.
styleSwitcher.addEventListener("click", () => {
    const themeLink = document.getElementById("theme-link");
    if (themeLink.getAttribute("href") == "./styles/dark-mode.css") {
        themeLink.setAttribute("href", "./styles/light-mode.css");
    } else {
        themeLink.setAttribute("href", "./styles/dark-mode.css");
    }
});

// Immediately Invoked Function Expression (IIFE) to load and display recipes when the page loads.
(async function initializeRecipesDisplay() {
    try {
        const recipes = await fetchAllRecipes(apiUrl);
        await displayRecipes(recipes);
        console.info("Display area loaded");
    } catch (error) {
        console.error("Error on initial load: ", error);
    }
})();
