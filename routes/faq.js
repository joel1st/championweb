"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('faq', {
        pageData: {
            appName: 'core',
            name: 'faq',
            title: 'All your questions answered here!'
        }
    });
});

module.exports = router;