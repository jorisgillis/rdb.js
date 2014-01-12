var db = require('../models');

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

exports.overview = function(req, res) {
    console.log("Overview!");
    db.Recipe.findAll().success(
        function(recipes) {
            console.log("Query successfull!");
            console.log("Number of recipes: "+ recipes.length);
            res.json('index', {recipes: recipes});
        }
    );
}
