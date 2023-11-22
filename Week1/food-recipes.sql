-- Recipes table
CREATE TABLE Recipes (
    recipes-ID INT PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);
-- category table
CREATE TABLE Category (
    category-ID INT PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);
-- ingredient table
CREATE TABLE ingredient (
    ingredient-ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);
-- steps table
CREATE TABLE step (
    tep-ID INT PRIMARY KEY,
    description TEXT NOT NULL
);

-- junction tables

CREATE TABLE recipe-category (
    recipe-id INT,
    category-id INT,
    PRIMARY KEY (recipe-ID, category-ID),
    FOREIGN KEY (recipe-ID) REFERENCES recipe(recipe-ID),
    FOREIGN KEY (category-ID) REFERENCES category(category-ID)
);
CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe-ID, ingredient-ID),
    FOREIGN KEY (recipe-ID) REFERENCES recipe(recipe-ID),
    FOREIGN KEY (ingredient-ID) REFERENCES ingredient(ingredientID)
);
CREATE TABLE recipe-step (
    recipe-ID INT,
    step-ID INT,
    PRIMARY KEY (recipe-ID, step-ID),
    FOREIGN KEY (recipe-ID) REFERENCES recipe(recipe-ID),
    FOREIGN KEY (step-ID) REFERENCES step(step_ID)
);