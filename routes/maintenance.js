"use strict";
module.exports = function(req, res){
	res.statusCode = 503;
    res.render('maintenance', {
    	pageData:{
    		core:{},
        	appName: 'core',
        	name:'maintenance',
        	title: 'Upgrades in progress!' 
        }
    });
};

