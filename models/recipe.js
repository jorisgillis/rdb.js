
module.exports.name = "Recipe";

module.exports.definition = function(sequelize, DataTypes) {
    var Recipe = sequelize.define('Recipe', {
        name: DataTypes.STRING,
        preparationTime: DataTypes.INTEGER,
        persons: DataTypes.INTEGER,
        preparation: DataTypes.TEXT,
        vegetarian: DataTypes.BOOLEAN
    }, {
        associate: function(models) {
            Recipe.belongsTo(models.User);
            Recipe.hasMany(models.Ingredient, {through: models.Quantity});
            Recipe.hasMany(models.Photo);
            Recipe.hasMany(models.Type);
            Recipe.hasMany(models.Season);
        }
    });
    return Recipe;
};
