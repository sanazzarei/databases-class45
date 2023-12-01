
db.recipes.insertOne({
  "recipes-ID": 1,
  "name": "No-Bake Cheesecake",
  "steps": [1, 2, 3, 4, 5, 6],
  "ingredient_ids": [1, 2, 3, 4, 5], // milk, Cream Cheese, Lemon Juice, Pie Crust, Cherry Jam
  "category_ids": [1, 2, 3] // Cake, No-Bake, Vegetarian
});

db.ingredients.insertMany([
  { "ingredient-ID": 1, "Name": "Condensed milk" },
  { "ingredient-ID": 2, "Name": "Cream Cheese" },
  { "ingredient-ID": 3, "Name": "Lemon Juice" },
  { "ingredient-ID": 4, "Name": "Pie Crust" },
  { "ingredient-ID": 5, "Name": "Cherry Jam" },
]);

db.categories.insertMany([
  { "category-ID": 1, "name": "Cake" },
  { "category-ID": 2, "name": "No-Bake" },
  { "category-ID": 3, "name": "Vegetarian" },
  { "category-ID": 4, "name": "Vegan" },
  { "category-ID": 5, "name": "Gluten-Free" }
]);

db.steps.insertMany([
  { "step-ID": 1, "description": "Beat Cream Cheese" },
  { "step-ID": 2, "description": "Add condensed Milk and blend" },
  { "step-ID": 3, "description": "Add Lemon Juice and blend" },
  { "step-ID": 4, "description": "Add the mix to the pie crust" },
  { "step-ID": 5, "description": "Spread the Cherry Jam" },
  {"step-ID": 6, "description": "Place in refrigerator for 3h."},
  
]);



### Collections:
Recipes Collection
Ingredients Collection
Categories Collection
Steps Collection

### What information will you embed in a document and which will you store normalised?
Recipe Collection: It may embed information about steps, ingredient_ids, and category_ids

### If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?

MySQL: Great for structured data, strict relationships, and complex queries.

MongoDB: Flexible, scalable, and ideal for unstructured or evolving data.

If we need strict connections between our data, have complex questions to ask about it, and handle many transactions, MySQL might be the way to go.

If we're looking for more adaptability, scalability, and a data structure that can change without strict rules, MongoDB could be our choice.
