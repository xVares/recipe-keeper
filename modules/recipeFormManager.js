// Singleton to keep track of wether the form's state is either add or update
class RecipeFormManager {

    // Class constructor that keeps track of the forms state and takes the submit button as argument
    constructor(submitButton) {
        if (!RecipeFormManager.instance) {
            this.isUpdating = false;
            this.submitButton = submitButton;
            RecipeFormManager.instance = this;
        }
        return RecipeFormManager.instance;
    }

    // Prepare the form to handle a post request
    prepareFormForAdd() {
        document.getElementById("form-header").value = "Add new Recipe";
        document.getElementById("recipe-id").value = "";
        this.submitButton.textContent = "Add Recipe";
        this.isUpdating = false;
    }

    // Prepare the form to handle a put request and populate the form with the recipe properties
    prepareFormForUpdate(recipe, recipeId, recipeName, ingredients, steps, recipeImg) {
        document.getElementById("form-header").textContent = "Update your Recipe";

        recipeId.value = recipe.id;
        recipeName.value = recipe.name;
        ingredients.value = recipe.ingredients.join(", ");
        steps.value = recipe.steps;

        // Ensure the image URL is valid or set to an empty string if not
        recipeImg.value = this.isValidUrl(recipe.img) ? recipe.img : "";

        this.submitButton.textContent = "Update Recipe";
        this.isUpdating = true;
    }


    // Provides user feedback after submitting the form, showing if the operation was successful or not
    displayNotification(message, isSuccess = true) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.className = 'notification' + (isSuccess ? ' success' : ' error');

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Checks if a string has a valid url format or not and returns a boolean value accordingly0
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (error) {
            return false;
        }
    }

}

export { RecipeFormManager };