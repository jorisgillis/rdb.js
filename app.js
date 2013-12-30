var express = require('express');
var routes = require('./routes');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', routes.index);

app.listen(3000);
