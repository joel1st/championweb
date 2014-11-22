"use strict";
module.exports = function(req, res){
	res.statusCode = 503;
    res.render('maintenance', {
    	pageData:{
    		patch:"",
        	appName: 'core',
        	name:'maintenance',
        	title: 'Upgrades in progress!' 
        }
    });
};

