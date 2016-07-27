// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var UserHandler = require('./handlers/userHandler');

var routes = require('./routes');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// instruct express to serve up static assets
app.use(express.static('public'));

var handlers = {
  user: new UserHandler()
};

function start() {
  routes.setup(app, handlers);
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
}
// *******************************************************
exports.start = start;
exports.app = app;

// set routes
app.get('/', function(req, res) {
  res.render('index');
});

start();
