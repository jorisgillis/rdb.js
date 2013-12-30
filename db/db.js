var sqlite = require("sqlite3");

var dbFile = "database.db";

function createDB() {
    return new sqlite.Database(dbFile);
}

exports.getAllRecipes = function() {
    var db = createDB();

    db.all("SELECT ");
};
