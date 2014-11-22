"use strict";
module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
      	watch: {
		    js: {
	          	files: [
					'routes/*.js',
		            'bin/*.js',
		            'logic/*.js',
		            'models/*.js',
		            'public/js/*.js',
		            '*.js'   
	            ],
	          	tasks: ['jshint']
    		},
		},
	    pkg: grunt.file.readJSON('package.json'),
		jshint: {
      		files: [
	          		'routes/*.js',
		            'bin/*.js',
		            'logic/*.js',
		            'models/*.js',
		            'public/js/*.js',
		            '*.js' 
	            ],
	    	options: {
	        // options here to override JSHint defaults
	        	node: true,
	        	loopfunc: true,
		        globals: {
		        	jQuery: false,
		        	console: true,
		        	module: true,
					require: true
		        }
		    }
      	}
    });
	    
    grunt.registerTask('default', []);
};