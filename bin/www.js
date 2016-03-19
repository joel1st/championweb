#!/usr/bin/env node
"use strict";
var debug = require('debug')('my-application');
var app = require('../app');
var db = require('../db');

<<<<<<< HEAD
app.set('port', process.env.PORT || 8000);
=======
app.set('port', process.env.PORT || 80);
>>>>>>> 0acee52b21d5eb5856cd35d38022084123812434

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
