
module.exports.name = "Type";

module.exports.definition = function(sequelize, DataTypes) {
    var Type = sequelize.define('Type', {
        type: DataTypes.STRING
    }, {
        associate: function(models) {
            Type.hasMany(models.Recipe);
        }
    });
    return Type;
};
