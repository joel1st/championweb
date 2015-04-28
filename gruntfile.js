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
			}
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
		concat: {
		    js: {
		      	src: ['public/dist/js/angular.js', 'public/dist/js/angular-bootstrap.js', 
		      		'public/dist/js/dirDisqus.js', 'public/dist/chart.js',
		      		'tc-angular-chartjs.js'],
		      	dest: 'public/js/vendor.js'
		    },
		},
	    uglify: {
			build:  {
			    files: {
			      	'public/js/vendor.js': 'public/js/vendor.min.js'
			    }
			}
		},
		cssmin: {
		    build: {
		        src: 'public/css/master.css',
		        dest: 'public/css/master.min.css'
		    }
    	}
    });
		grunt.registerTask('production', ['concat', 'uglify','cssmin']);
	grunt.registerTask('default', []);
};