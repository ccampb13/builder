'use strict';

var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var traceur        = require('traceur');
var express        = require('express');
var less           = require('express-less');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var initMongo      = traceur.require(__dirname + '/lib/init-mongo.js');
var initRoutes     = traceur.require(__dirname + '/lib/init-routes.js');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --- pipeline begins */
app.use(initMongo.connect);
app.use(initRoutes);
app.use(morgan({format: 'dev'}));
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(bodyParser());
app.use(methodOverride());
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;
