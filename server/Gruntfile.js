'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		jshint: {

			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},

			all: ['Gruntfile.js', 'config/**/*.js', 'lib/**/*.js', 'test/**/*.js']
		},


		express: {

			options: {
				// Override defaults here
			},

			dev: {
				options: {
					script: 'server.js',
					node_env: 'development',
					debug: true,
					port: 3000
				}
			},

			prod: {
				options: {
					script: 'server.js',
					node_env: 'production',
					port: 3000
				}
			},

			test: {
				options: {
					script: 'server.js',
					node_env: 'test',
					port: 3001
				}
			}
		},


		watch: {
			express: {
				files:  [ 'server.js', 'lib/**/*.js', 'config/**/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					spawn: false // Without this option specified express won't be reloaded
				}
			}
		},



		jasmine_node: {
			options: {
				forceExit: true,
				match: '.',
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec',
				jUnit: {
					report: false,
					savePath : './build/reports/jasmine/',
					useDotNotation: true,
					consolidate: true
				}
			},
			all: ['spec/']
		}



	});


	grunt.registerTask('default', [ 'jshint' ]);

	grunt.registerTask('server', [ 'jshint', 'express:dev', 'watch' ]);

	grunt.registerTask('test', [ 'jshint', 'express:test', 'jasmine_node' ]);

};
