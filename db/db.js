var sqlite = require("sqlite3");
var _ = require("underscore");

var dbFile = "database.db";

function createDB() {
    return new sqlite.Database(dbFile);
}

exports.getAllRecipesWithTypesAndFirstPhoto = function() {
    var db = createDB();

    var listOfRecipes = [];
    
    db.serialize(function() {
        db.each("SELECT * FROM recipes ORDER BY creation_date", function(err, recipe) {
            listOfRecipes.push(recipe);
            
            var typesStmt = db.prepare("SELECT type FROM recipe_type WHERE recipe_id=?");
            typesStmt.all(recipe.id, function(err, rows) {
                recipe.types = _.map(rows, extractType);
            });
            typesStmt.finalize();

            var photoStmt = db.prepare("SELECT photos.name, photos.photo "+
                                       "FROM recipe_photo, photos"+
                                       "WHERE recipe_photo.recipe_id=? "+
                                       "AND photos.id=recipe_photo.photo_id");
            photoStmt.get(recipe.id, function(err, photo) {
                recipe.photo = photo;
            });
            photoStmt.finalize();
        });
    });

    db.close();
    return listOfRecipes;
};


function extractType(typeObj) {
    return typeObj.type
}
