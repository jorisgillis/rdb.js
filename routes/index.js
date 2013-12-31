var db = require('../models');

exports.index = function(req, res) {
    if(typeof req.user === 'undefined'){
        res.render('login');
    } else {
        //res.render('index');
	exports.overview(req, res);
    }
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

exports.overview = function(req, res) {
    db.Recipe.findAll().success(
	function(recipes) {
	    console.log("Recipes: "+ recipes);
	    res.render('index', {recipes: recipes});
	}
    );
}
