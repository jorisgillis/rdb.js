var db = require('../models');

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
    console.log("Overview!");
    db.Recipe.findAll().success(
        function(recipes) {
            res.json({'recipes': recipes});
        }
    );
}

exports.recipe = function(req, res) {
    var recipeId = req.param('recipeId');
    db.Recipe.find(recipeId).success(
        function(recipe) {
            res.json({'recipe': recipe})
        }
    );
}
