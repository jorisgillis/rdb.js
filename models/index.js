// Configuring database
var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    lodash    = require('lodash'),
    sequelize = new Sequelize('database.db', null, null, {dialect: "sqlite"}),
    db        = {};

// Loading all models 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file.indexOf('~') == -1) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var modelDefinition = require(path.join(__dirname, file));
        console.log(modelDefinition.name);
        var model = sequelize.import(modelDefinition.name, modelDefinition.definition);
        db[modelDefinition.name] = model;
    })

// Loading associations 
Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
})

 
module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)
