
module.exports.name = "Ingredient";

module.exports.definition = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define('Ingredient', {
        name: DataTypes.STRING
    }, {
        associate: function(models) {
            Ingredient.hasMany(models.Recipe, {through: models.Quantity});
            Ingredient.hasMany(models.Season);
        }
    });
    return Ingredient;
};
