var express = require('express'),
    routes = require('./routes'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    db = require('./models');
    path = require('path');

var app = express();
var url = process.env.HOSTNAME || 'localhost';
var port = process.env.PORT || '3000';
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser())
    app.use(express.session({secret: 'test'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, 'public')));
});

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done){
    done(null, id);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://' + url + ':' + port + '/auth/google/return',
        realm: 'http://' + url + ':' + port
    },
    function(identifier, profile, done) {
        done(null, profile.emails[0].value);
    }
));

// Index
app.get('/', routes.index);

// Auth URLs
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return',
    passport.authenticate('google', {failureRedirect: '/'}),
    function(req, res){
        res.redirect('/');
    });
app.get('/logout', routes.logout);

// REST Interface
app.get('/api/recipe/:recipeId', routes.recipe);
app.get('/api/recipe', routes.overview);

app.get('/api/ingredients/:ingredientId', routes.ingredient);
app.get('/api/ingredients', routes.ingredients);

// Fallback URL
app.get('*', routes.index);

// Setting up database and starting application
db
    .sequelize
    .sync({ force: false })
    .complete(function(err) {
        if (err) {
            throw err
        } else {
            app.listen(port);
        }
    });
