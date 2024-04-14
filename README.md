# Recipe Keeper

Recipe Keeper is a full-stack web application designed to store, display, and manage cooking recipes. It allows users to add, update, delete, and view recipes through the web interface by utilizing CRUD operations.

## Features

- **Create Recipes**: Add new recipes with ingredients, steps, and an image.
- **Read Recipes**: View all recipes in a neatly formatted list with options to view detailed descriptions.
- **Update Recipes**: Modify existing recipes and save changes.
- **Delete Recipes**: Remove recipes from the database.
- **Responsive UI**: The application is fully responsive and supports various devices and screen sizes.

## Technologies

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: FastAPI (Python)
- **Database**: JSON file storage (mock database for simplicity)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js and npm

## Usage

After starting the application, you can use the web interface to manage recipes. The homepage displays all recipes stored in the database, and you can add a new recipe using the "Add Recipe" button. To update a recipe, use the "Update" button on each recipe card which will populate the form with the recipe's properties that can then be submitted to confirm the changes. The immediate deletion of a recipe is done by clicking on the "Delete" button of the corresponding recipe card.

## License

Distributed under the MIT License. See `LICENSE` for more information.
