#!/usr/bin/env node
"use strict";
var debug = require('debug')('my-application');
var app = require('../app');
var db = require('../db');

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
