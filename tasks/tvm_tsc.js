module.exports = function(grunt) {
  'use strict';
  var taskName = 'tvm-tsc';
  var description = 'Compile TypeScript files into JavaScript with tvm';
  var taskFunction = function () {};


  grunt.registerMultiTask(taskName, description, taskFunction);
};
