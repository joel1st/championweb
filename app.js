"use strict";
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');

//middle ware
var overallData = require('./middleware/overall_data.js');

//routes
var champion = require('./routes/champion');
var matchup = require('./routes/matchup');
var matchupJson = require('./routes/matchup_json');
var apiStatic = require('./routes/api_static');
var statistics = require('./routes/statistics');
var faq = require('./routes/faq');
var index = require('./routes/index');

var app = express();

app.get('/*', function(req, res, next) { // redirect to http instead of www
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
});

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
//set cache headers for page now that we are utilizing cloudflare
app.use(function(req, res, next){
  res.setHeader('Cache-Control', 'public, max-age=60'); //cache pages for 1 minute, if needed I can purge cache from cloud flare
  next();
});

app.use(overallData);

app.use('/champion', champion);
app.use('/matchup', matchup);
app.use('/matchupJson', matchupJson);
app.use('/static', apiStatic);

app.use('/statistics', statistics);
app.use('/faq', faq);
app.use('/', index);

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
} else {
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
}

module.exports = app;
