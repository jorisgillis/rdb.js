var db = require('../models');
var _ = require('../node_modules/lodash/lodash.js');
var async = require('../node_modules/async/lib/async.js');

//-- Regular HTTP requests
exports.index = function(req, res) {
    if(typeof req.user === 'undefined'){
        res.render('login');
    } else {
        res.render('index');
    }
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}


//-- REST API
exports.overview = function(req, res) {
    db.Recipe.findAll().success(
        function(recipes) {
            res.json({'recipes': recipes});
        }
    );
}

exports.recipe = function(req, res) {
    var recipeId = req.param('recipeId');
    db.Recipe.find({where: {id: recipeId}, include: [db.Ingredient, db.Photo, db.Type, db.Season]}).success(
        function(recipe) {
            db.Quantity.findAll({where: {recipeId: recipeId}})
            .then(function(rawQuantities) {
                var quantities =  _.map(rawQuantities, function(rawQuantity) { return rawQuantity.dataValues; });
                var ingredientIds = _.map(quantities, function(quantity) { return quantity.IngredientId; });
                db.Ingredient.findAll({where: { id: ingredientIds } }).success(function(ingredients) {
                    var ingredientList = createIngredientList(quantities, ingredients);
                    res.json({'recipe': recipe, 'ingredientList': ingredientList});
                });
            });
        }
    );
}


function fetchIngredientsForQuantities(quantities) {
    var ingredientIds = _.map(quantities, function(quantity) { return quantity.IngredientId; });
    return db.Ingredient.findAll(ingredientIds);
}

function createIngredientList(quantities, ingredients) {
    return _.zip(
        _.map(quantities, function(quantity) { return quantity.quantity; }), 
        _.map(ingredients, function(ingredient) { return ingredient.dataValues.name; }));
}
