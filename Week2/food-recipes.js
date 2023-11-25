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
    DROP DATABASE IF EXISTS food_recipes;
    CREATE DATABASE food_recipes;
    USE food_recipes;

    CREATE TABLE recipes (
        recipe_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE ingredients (
        ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE steps (
        step_id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL
    );

    CREATE TABLE recipe_category (
        recipe_id INT,
        category_id INT,
        PRIMARY KEY (recipe_id, category_id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );

    CREATE TABLE recipe_ingredient (
        recipe_id INT,
        ingredient_id INT,
        PRIMARY KEY (recipe_id, ingredient_id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
    );

    CREATE TABLE recipe_step (
        recipe_id INT,
        step_id INT,
        PRIMARY KEY (recipe_id, step_id),
        FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
        FOREIGN KEY (step_id) REFERENCES steps(step_id)
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
    ('Bake for 30 minutes'),
    ('Cook Macaroni for 8 minutes'),
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
    ('Let is cook for 1 minute'),
    ('Remove pan from fire');

    INSERT INTO recipe_category (recipe_id, category_id) VALUES
    (1, 1), 
    (1, 2), 
    (1, 3), 
    (2, 4), 
    (2, 5),
    (3, 3), 
    (4, 3), 
    (4, 6); 

    INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES
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
    (3, 14), 
    (3, 15), 
    (4, 16),
    (4, 17), 
    (4, 9); 

    INSERT INTO recipe_step (recipe_id, step_id) VALUES
    (1, 1), 
    (1, 2), 
    (1, 3), 
    (1, 4), 
    (1, 5), 
    (1, 6), 
    (2, 7), 
    (2, 8), 
    (2, 9), 
    (2, 10), 
    (3, 11), 
    (3, 12), 
    (3, 13), 
    (3, 14), 
    (3, 15), 
    (3, 16), 
    (4, 17), 
    (4, 18), 
    (4, 19), 
    (4, 20),
    (4, 21), 
    (4, 22), 
    (4, 23);

  SELECT DISTINCT R.name AS recipe_name
  FROM recipes R
  INNER JOIN recipe_ingredient RI ON R.recipe_id = RI.recipe_id
  INNER JOIN ingredients I ON RI.ingredient_id = I.ingredient_id
  WHERE I.name = 'Potatoes'
  AND R.recipe_id IN (
    SELECT RC.recipe_id
    FROM recipe_category RC
    INNER JOIN categories C ON RC.category_id = C.category_id
    WHERE C.name = 'Vegetarian'
  );

  SELECT R.name AS recipe_name
  FROM recipes R
  INNER JOIN recipe_category RC ON R.recipe_id = RC.recipe_id
  INNER JOIN categories C ON RC.category_id = C.category_id
  WHERE C.name = 'Cake' AND R.recipe_id IN (
    SELECT RC2.recipe_id
    FROM recipe_category RC2
    INNER JOIN categories C2 ON RC2.category_id = C2.category_id
    WHERE C2.name = 'No-Bake'
  );

  SELECT R.name AS recipe_name
  FROM recipes R
  INNER JOIN recipe_category RC ON R.recipe_id = RC.recipe_id
  INNER JOIN categories C ON RC.category_id = C.category_id
  WHERE C.name IN ('Vegan', 'Japanese')
  GROUP BY R.name;
  `;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("SQL statements executed successfully", results);
    connection.end();
  });
});
