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
