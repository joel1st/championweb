"use strict";
var data = require('../models/data.js');

module.exports = function(req, res){

    res.render('faq', {
    	pageData:{
    		core: data.core,
        	appName: 'core',
        	name:'faq',
        	title: 'All your questions answered here!' 
        }
    });
};

