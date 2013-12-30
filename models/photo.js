
module.exports.name = "Photo";

module.exports.definition = function(sequelize, DataTypes) {
    var Photo = sequelize.define('Photo', {
        name: DataTypes.STRING,
        image: DataTypes.BLOB
    }, {
        associate: function(models) {
            Photo.belongsTo(models.Recipe);
        }
    });
    return Photo;
};

