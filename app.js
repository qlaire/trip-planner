var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var swig = require('swig');

// templating boilerplate setup
app.engine('html', swig.renderFile); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
app.set('views', __dirname + '/views'); // where to find the views
swig.setDefaults({ cache: false });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes'));

// app.get('/', function(req, res) {
//   res.render('index');
// });

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render('error');
});

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
