module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      all: [
        'tasks/tvm_tsc.js',
        'Gruntfile.js',
      ],
    },
    tvm_tsc: {
      all: {
        options: {
          version: '1.0.1',    // default: latest
          sourceMap: true,     // default: false
          target: 'es5',       // default: es3
          module: 'commonjs',  // default: amd
          declaration: true,   // default: false
          removeComments: true // default: false
        },
        files: {
          'test/js/Raytracer.js': 'test/ts/Raytracer.ts',
          'test/js/SimpleInheritance.js': 'test/ts/SimpleInheritance.ts'
        }
      }
    }
  });

  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint', 'tvm_tsc']);
};
