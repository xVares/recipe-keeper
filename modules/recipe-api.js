import { apiUrl, recipeId, recipeName, ingredients, steps, recipeImg, recipeFormManager } from "./init.js";

// Helper function to create a recipe card DOM element
function createRecipeCard(recipe) {
    // Main container for a recipe card
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe-card";

    // Element for displaying the recipe name
    const recipeNameElement = document.createElement("h3");
    recipeNameElement.className = "recipe-card-name";
    recipeNameElement.textContent = recipe.name;
    recipeDiv.appendChild(recipeNameElement);

    // Element for displaying the recipe image
    const recipeImage = document.createElement("img");
    recipeImage.className = "recipe-card-img";
    recipeImage.src = recipe.img;
    recipeDiv.appendChild(recipeImage);

    // Element for displaying the ingredients list
    const ingredientsElement = document.createElement("p");
    ingredientsElement.className = "recipe-card-ingredients";
    ingredientsElement.textContent = recipe.ingredients.join(", ");
    recipeDiv.appendChild(ingredientsElement);

    // Element for displaying the cooking steps
    const stepsElement = document.createElement("p");
    stepsElement.className = "recipe-card-steps";
    stepsElement.textContent = recipe.steps;
    recipeDiv.appendChild(stepsElement);

    // Button to delete the recipe
    const deleteButton = document.createElement("button");
    deleteButton.className = "del-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("type", "button");
    deleteButton.onclick = () => deleteRecipe(apiUrl, recipe.id);
    recipeDiv.appendChild(deleteButton);

    // Button to update the recipe
    const updateButton = document.createElement("button");
    updateButton.className = "update-button";
    updateButton.textContent = "Update";
    deleteButton.setAttribute("type", "button");
    updateButton.onclick = () => {
        recipeFormManager.prepareFormForUpdate(recipe, recipeId, recipeName, ingredients, steps, recipeImg);
    };
    recipeDiv.appendChild(updateButton);

    return recipeDiv;
}

// Function to make HTTP requests using fetch API
async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        recipeFormManager.displayNotification("Operation successful");
        return await response.json();
    } catch (error) {
        console.error(`Request failed: ${error.message}`);
        recipeFormManager.displayNotification("Request failed", false);
        return null;
    }
}

// Function to display recipes on the webpage
async function displayRecipes(recipes) {
    const displayArea = document.getElementById("display-area");
    displayArea.innerHTML = "";

    try {
        // Provide feedback to user if there are no recipes in the db
        if (!recipes || recipes.length === 0) {
            displayArea.innerHTML = "<p>No recipes found.</p>";
            console.info("No recipes found");
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            displayArea.appendChild(recipeCard);
        });

        console.info("Recipes have been displayed");
    } catch (error) {
        console.error("Error occurred while fetching recipes: ", error);
        displayArea.innerHTML = "<p>Error loading recipes. Please try again later.</p>";
    }
}

// Function to fetch all recipes from the server
async function fetchAllRecipes(path) {
    return await makeRequest(path, { method: "GET" });
}

// Function to fetch a single recipe by ID from the server
async function fetchRecipeById(path, recipeId) {
    return await makeRequest(`${path}/${recipeId}`, { method: "GET" });
}

// Function to add a new recipe to the server
async function addRecipes(path, newRecipe) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe)
    };
    return await makeRequest(path, options);
}

// Function to update an existing recipe on the server
async function updateRecipe(path, updatedRecipe) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRecipe)
    };
    return await makeRequest(`${path}/${updatedRecipe.id}`, options);
}

// Function to delete a recipe from the server
async function deleteRecipe(path, recipeId) {
    return await makeRequest(`${path}/${recipeId}`, { method: "DELETE" });
}

export { displayRecipes, fetchAllRecipes, fetchRecipeById, addRecipes, updateRecipe, deleteRecipe };