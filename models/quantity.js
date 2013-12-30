
module.exports.name = "Quantity";

module.exports.definition = function(sequelize, DataTypes) {
    return sequelize.define('Quantity', {
        quantity: DataTypes.FLOAT
    });
};
