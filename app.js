"use strict";
var express = require('express');
var data = require('./models/data')
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');


//routes
var champion = require('./routes/champion');
var matchup = require('./routes/matchup');
var matchupJson = require('./routes/matchupJson');
var statistics = require('./routes/statistics');
var votes = require('./routes/votes');
var faq = require('./routes/faq');
var index = require('./routes/index');
var votes = require('./routes/votes');
var maintenance = require('./routes/maintenance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compress());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '2kb', extended: true}));
app.use(bodyParser.urlencoded({limit: '2kb', extended: true}));

app.use(express.static(path.join(__dirname, 'public'), {maxAge:86400000})); //one day

//pages
if(app.get('env') === 'serverUpdate'){
  app.get('*', maintenance);
}
app.get('/champion/:champ', champion.champion);
app.get('/champion/:champ/:role', champion.championRole);

app.get('/matchup/:champ1/:champ2/:role', matchup);
app.get('/matchupJson/:champ1/:champ2/:role', matchupJson);

app.get('/statistics/', statistics);
app.get('/faq/', faq);
app.get('/', index);


//post
app.post('/sendmatchup', votes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.statusCode = err.status;
      res.render('error', {
          pageData:{
            appName: 'core',
            name:'error',
            title: 'We got ourselves a problem...',
            updating: data.updating
          },
          message: err.message,
          error: err
      });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.statusCode = err.status;
    res.render('error', {
        pageData:{
          appName: 'core',
          name:'error',
          title: 'We got ourselves a wild teemo problem...',
          updating: data.updating 
        },
        message: err.message,
        error: {}
    });
  });
}

module.exports = app;
