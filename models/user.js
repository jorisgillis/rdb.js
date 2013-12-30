
module.exports.name = "User";

module.exports.definition = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        login: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        associate: function(models) {
            User.hasMany(models.Recipe);
        }
    });
    return User;
};


