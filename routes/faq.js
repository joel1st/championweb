"use strict";
var data = require('../models/data.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('faq', {
        pageData: {
            core: data.core,
            appName: 'core',
            name: 'faq',
            title: 'All your questions answered here!'
        }
    });
});

module.exports = router;