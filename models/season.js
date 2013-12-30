
module.exports.name = "Season";

module.exports.definition = function(sequelize, DataTypes) {
    var Season = sequelize.define('Season', {
        season: DataTypes.STRING
    }, {
        associate: function(models) {
            Season.hasMany(models.Recipe);
            Season.hasMany(models.Ingredient);
        }
    });
    return Season;
};
