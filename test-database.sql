BEGIN;

-- Inserting test users
INSERT INTO Users VALUES('matt.meatlover@gmail.com', 'Maat Meatlover', 1, date('now'), date('now'));
INSERT INTO Users VALUES('vegan.virgil@gmail.com', 'Vegan Virgil', 2, date('now'), date('now'));

-- Types of recipes
INSERT INTO Types VALUES('Breakfast', 1, date('now'), date('now'));
INSERT INTO Types VALUES('Lunch', 2, date('now'), date('now'));
INSERT INTO Types VALUES('Diner', 3, date('now'), date('now'));
INSERT INTO Types VALUES('Appetizer', 4, date('now'), date('now'));
INSERT INTO Types VALUES('Dessert', 5, date('now'), date('now'));
INSERT INTO Types VALUES('Main Course', 6, date('now'), date('now'));
INSERT INTO Types VALUES('Snack', 7, date('now'), date('now'));

-- Seasons
INSERT INTO Seasons VALUES('Spring', 1, date('now'), date('now'));
INSERT INTO Seasons VALUES('Summer', 2, date('now'), date('now'));
INSERT INTO Seasons VALUES('Autumn', 3, date('now'), date('now'));
INSERT INTO Seasons VALUES('Winter', 4, date('now'), date('now'));

-- Ingredients
INSERT INTO Ingredients VALUES('Broccoli', 1, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Sprouts', 2, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Flour', 3, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Salt', 4, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Pepper', 5, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Beef', 6, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Tofu', 7, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Eggplant', 8, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Carrot', 9, date('now'), date('now'));
INSERT INTO Ingredients VALUES('Butter', 10, date('now'), date('now'));

-- Recipes
INSERT INTO Recipes VALUES('Burger', 30, 4, 'Flip it!', 0, 1, date('now'), date('now'), 1);
INSERT INTO Recipes VALUES('Steak', 45, 4, 'Burn it!', 0, 2, date('now'), date('now'), 1);
INSERT INTO Recipes VALUES('Vegan Burger', 25, 4, 'Mash it!', 0, 3, date('now'), date('now'), 2);
INSERT INTO Recipes VALUES('Salade', 15, 4, 'Mix it!', 0, 4, date('now'), date('now'), 2);

-- Linking Recipes & Types
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 2, 1);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 3, 1);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 2, 2);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 3, 2);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 6, 3);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 2, 4);
INSERT INTO RecipesTypes VALUES(date('now'), date('now'), 4, 4);

-- Linking Recipes & Seasons
INSERT INTO RecipesSeasons VALUES(date('now'), date('now'), 1, 4);
INSERT INTO RecipesSeasons VALUES(date('now'), date('now'), 2, 4);

-- Linking Ingredients & Seasons
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 3, 1);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 4, 1);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 3, 2);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 4, 2);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 2, 8);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 3, 8);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 4, 8);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 1, 9);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 2, 9);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 3, 9);
INSERT INTO IngredientsSeasons VALUES(date('now'), date('now'), 4, 9);

-- Linking Recipes & Ingredients
INSERT INTO Quantities VALUES(250, date('now'), date('now'), 1, 6);
INSERT INTO Quantities VALUES(50, date('now'), date('now'), 1, 10);
INSERT INTO Quantities VALUES(350, date('now'), date('now'), 1, 3);
INSERT INTO Quantities VALUES(500, date('now'), date('now'), 2, 6);
INSERT INTO Quantities VALUES(5, date('now'), date('now'), 2, 4);
INSERT INTO Quantities VALUES(5, date('now'), date('now'), 2, 5);
INSERT INTO Quantities VALUES(0.5, date('now'), date('now'), 3, 1);
INSERT INTO Quantities VALUES(300, date('now'), date('now'), 3, 7);
INSERT INTO Quantities VALUES(450, date('now'), date('now'), 3, 3);
INSERT INTO Quantities VALUES(2, date('now'), date('now'), 3, 8);
INSERT INTO Quantities VALUES(0.5, date('now'), date('now'), 4, 1);
INSERT INTO Quantities VALUES(15, date('now'), date('now'), 4, 2);
INSERT INTO Quantities VALUES(3, date('now'), date('now'), 4, 9);
INSERT INTO Quantities VALUES(1.5, date('now'), date('now'), 4, 10);

COMMIT;
