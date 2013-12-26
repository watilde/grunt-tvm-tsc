module.exports = function(grunt) {
  'use strict';
  var taskName = 'tvm_tsc';
  var description = 'Compile TypeScript files into JavaScript with tvm';
  var async = require('async');
  var tvm = require('tvm');
  var taskFunction = function () {
  };


  grunt.registerMultiTask(taskName, description, taskFunction);
};
