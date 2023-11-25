const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const query = `
  DROP DATABASE IF EXISTS food-recipes;
  CREATE DATABASE food-recipes;
  USE food-recipes;



  CREATE TABLE recipes (
    recipes-id INT PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE category (
    category-id INT PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE ingredient (
    ingredient-id INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);
CREATE TABLE step (
    tep-id INT PRIMARY KEY,
    description TEXT NOT NULL
);


CREATE TABLE recipe-category (
    recipe-id INT,
    category-id INT,
    PRIMARY KEY (recipe-id, category-id),
    FOREIGN KEY (recipe-id) REFERENCES recipe(recipe-id),
    FOREIGN KEY (category-id) REFERENCES category(category-id)
);
CREATE TABLE recipe_ingredient (
    recipe-id INT,
    ingredient-id INT,
    PRIMARY KEY (recipe-id, ingredient-id),
    FOREIGN KEY (recipe-id) REFERENCES recipe(recipe-id),
    FOREIGN KEY (ingredient-id) REFERENCES ingredient(ingredientID)
);
CREATE TABLE recipe-step (
    recipe-id INT,
    step-id INT,
    PRIMARY KEY (recipe-id, step-id),
    FOREIGN KEY (recipe-id) REFERENCES recipe(recipe-id),
    FOREIGN KEY (step-id) REFERENCES step(step-id)
);

INSERT INTO recipes (name) VALUES
('No-Bake Cheesecake'),
('Roasted Brussels Sprouts'),
('Mac & Cheese'),
('Tamagoyaki Japanese Omelette');


INSERT INTO categories (name) VALUES
('Cake'),
('No-Bake'),
('Vegetarian'),
('Vegan'),
('Gluten-Free'),
('Japanese');


INSERT INTO ingredients (name) VALUES
('Condensed milk'),
('Cream Cheese'),
('Lemon Juice'),
('Pie Crust'),
('Cherry Jam'),
('Brussels Sprouts'),
('Sesame seeds'),
('Pepper'),
('Salt'),
('Olive oil'),
('Macaroni'),
('Butter'),
('Flour'),
('Milk'),
('Shredded Cheddar cheese'),
('Eggs'),
('Soy sauce'),
('Sugar');


INSERT INTO steps (description) VALUES
('Beat Cream Cheese'),
('Add condensed Milk and blend'),
('Add Lemon Juice and blend'),
('Add the mix to the pie crust'),
('Spread the Cherry Jam'),
('Place in refrigerator for 3h.'),
('Preheat the oven'),
('Mix the ingredients in a bowl'),
('Spread the mix on baking sheet'),
('Bake for 30'''),
('Cook Macaroni for 8'''),
('Melt butter in a saucepan'),
('Add flour, salt, pepper and mix'),
('Add Milk and mix'),
('Cook until mix is smooth'),
('Add cheddar cheese'),
('Add the macaroni'),
('Beat the eggs'),
('Add soya sauce, sugar and salt'),
('Add oil to a sauce pan'),
('Bring to medium heat'),
('Add some mix to the sauce pan'),
('Let is cook for 1'''),
('Remove pan from fire');


INSERT INTO recipe_category (recipe-id, category-id) VALUES
-- No-Bake Cheesecake
(1, 1), 
(1, 2), 
(1, 3), 
(2, 4), 
(2, 5),
(3, 3), 
(4, 3), 
(4, 6); 


INSERT INTO recipe_ingredient (recipe-id, ingredient-id) VALUES
(1, 1), 
(1, 2),
(1, 3), 
(1, 4), 
(1, 5),
(2, 6), 
(2, 7), 
(2, 8), 
(2, 9), 
(2, 10),
(3, 11), 
(3, 12), 
(3, 13),
(3, 9), 
(3, 8), 
(3, 14); 
(4, 15), 
(4, 16),
(4, 17), 
(4, 9); 

INSERT INTO recipe_step (recipe-id, step-id) VALUES
(1, 1), 
(1, 2), 
(1, 3), 
(1, 4), 
(1, 5), 
(1, 6); 
(2, 7), 
(2, 8), 
(2, 9), 
(2, 10); 
(3, 11), 
(3, 12), 
(3, 13), 
(3, 14), 
(3, 15), 
(3, 16); 
(4, 17), 
(4, 18), 
(4, 19), 
(4, 20),
(4, 21), 
(4, 22), 
(4, 23);


SELECT recipe_name
FROM recipe_Ingredient
WHERE category-id = (SELECT category-id FROM category WHERE name = 'Vegetarian')
AND ingredient_name = 'Potatoes';

SELECT recipe_ingredient.recipe_name
FROM recipe_Ingredient
JOIN category ON recipe_ingredient.category-id = category.category-id
WHERE category.name = 'Cake'
  AND recipe_ingredient.recipe_name NOT IN (
    SELECT RI2.recipe_name
    FROM recipe_ingredient RI2
    WHERE RI2.ingredient_name = 'Baking'
);

SELECT recipe_name
FROM recipe_ingredient
WHERE category-id = (SELECT category-id FROM category WHERE name = 'Vegan')
AND recipe_name IN (
    SELECT recipe_name
    FROM recipe_ingredient
    WHERE category-id = (SELECT category-id FROM category WHERE name = 'Japanese')
);


  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});










