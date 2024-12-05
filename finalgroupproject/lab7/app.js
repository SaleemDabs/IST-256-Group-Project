

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

 

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

// var songs = require('./public/data/songs.json')

var app = express();


// Mongo Setup
var MongoClient = require('mongodb').MongoClient

async function getClient() {
  return MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
}


// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

 

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


var profilesRouter = require('./routes/profiles'); // Add this
app.use('/profiles', profilesRouter);             // Add this



app.get('/getList', async function(request, response) {

  const dbClient = await getClient()
  const dbObject = dbClient.db('songDatabase')
  const collection = dbObject.collection('songs')
  const allSongs = await collection.find({}).toArray();

  response.setHeader('Content-Type', 'application/json')
  response.json(allSongs)
})

 

app.use('/', indexRouter);

app.use('/users', usersRouter);

 

// for the create user

var usersRouter = require('./routes/users');

app.use('/users', usersRouter);

 

// catch 404 and forward to error handler

app.use(function(req, res, next) {

  next(createError(404));

});

 

// error handler

app.use(function(err, req, res, next) {

  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

 

  // render the error page

  res.status(err.status || 500);

  res.render('error');

});

 

module.exports = app;