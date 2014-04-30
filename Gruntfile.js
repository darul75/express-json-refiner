module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/**/*.js', 'test/**/*.js']
    },
    // UGLIFY TASK
    uglify: {
      task1: {
       options: {
        preserveComments: 'some',
        report: 'min',
        banner: '/*! \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
         '* (c) 2013 Julien VALERY https://github.com/darul75/express-json-refiner\n' +
         '* License: MIT \n*/\n'
        },         
        files: {'lib/express-json-refiner.js': ['src/refiner.js', 'src/processor.js']
       }
      }
    },
    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,        
        ui: 'bdd',
        reporter: 'tap'        
      },

      all: { src: ['test/**/*.js'] }
    }
});

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');  

  // TASK REGISTER
  grunt.registerTask('default', ['jshint', 'simplemocha']);
};
