#!/usr/bin/env node
"use strict";
var debug = require('debug')('my-application');

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compress = require('compression');

//routes
var maintenance = require('../routes/maintenance');
var app = express();

// view engine setup
app.set('views', path.join('../', 'views'));
app.set('view engine', 'ejs');

app.use(compress());
app.use(logger('dev'));

app.use(express.static(path.join('../', 'public'), {maxAge:86400000})); //one day

//pages
app.get('*', maintenance);

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
            title: 'We got ourselves a problem...' 
          },
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.statusCode = err.status;
  res.render('error', {
      pageData:{
        appName: 'core',
        name:'error',
        title: 'We got ourselves a wild teemo problem...' 
      },
      message: err.message,
      error: {}
  });
});







app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});