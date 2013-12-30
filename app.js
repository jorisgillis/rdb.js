var express = require('express'),
    routes = require('./routes'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,
    db = require('./models');

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

app.get('/', routes.index);
// Login URLs
app.get('/login', routes.login);
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', passport.authenticate('google', {
    succesRedirect: '/',
    failureRedirect: '/login'
}));
// Fallback URL
app.get('*', routes.index);

db
    .sequelize
    .sync({ force: true })
    .complete(function(err) {
        if (err) {
            throw err
        } else {
            app.listen(port);
        }
    });
