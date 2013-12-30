DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS quantity;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS recipe_type;
DROP TABLE IF EXISTS recipe_photo;


CREATE TABLE recipes (
    id INTEGER PRIMARY KEY, 
    name TEXT(256) NOT NULL,
    user TEXT(256) NOT NULL,
    creation_date INTEGER NOT NULL,
    preparationTime INTEGER NOT NULL,
    persons INTEGER NOT NULL,
    description TEXT NOT NULL,
    vegetarian INTEGER,
    CONSTRAINT user_references_login FOREIGN KEY (user) REFERENCES Users (login),
    CONSTRAINT vegetarian_is_boolean CHECK(vegetarian = 0 or vegetarian = 1)
);

CREATE TABLE users (
    login TEXT(256) PRIMARY KEY,
    name TEXT(256) NOT NULL
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY,
    name TEXT(256) NOT NULL
);

CREATE TABLE types (
    type TEXT(128) PRIMARY KEY
);

CREATE TABLE photos (
    id INTEGER PRIMARY KEY,
    name TEXT(512) NOT NULL,
    photo BLOB NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user TEXT(256) NOT NULL,
    recipe_id INTEGER NOT NULL,
    note TEXT NOT NULL,
    FOREIGN KEY (user) REFERENCES Users(login),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE quantity (
    ingredient_id INTEGER,
    recipe_id INTEGER,
    quantity INTEGER,
    CONSTRAINT ingredient_recipe_unique UNIQUE (ingredient_id, recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE recipe_type (
    recipe_id INTEGER,
    type TEXT(128),
    CONSTRAINT unique_recipe_type UNIQUE (recipe_id, type)
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (type) REFERENCES types(type)
);

CREATE TABLE recipe_photo (
    recipe_id INTEGER,
    photo_id INTEGER,
    CONSTRAINT unique_recipe_photo UNIQUE (recipe_id, photo_id)
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (photo_id) REFERENCES photos(ID)
);

CREATE INDEX note_user ON notes(user);
CREATE INDEX note_recipe ON notes(recipe_id);
CREATE INDEX quantiy_ingredient ON quantity(ingredient_id);
CREATE INDEX quantity_recipe ON quantity(recipe_id);
CREATE INDEX recipe_type_recipe ON recipe_type(recipe_id);
CREATE INDEX recipe_type_type ON recipe_type(type);
CREATE INDEX recipe_photo_recipe ON recipe_photo(recipe_id);
