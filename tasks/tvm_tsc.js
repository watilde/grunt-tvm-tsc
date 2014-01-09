module.exports = function(grunt) {
  'use strict';
  var taskName = 'tvm_tsc';
  var description = 'Compile TypeScript files into JavaScript with tvm';
  var async = require('async');
  var path = require('path');
  var tvm = require('tvm');
  var _ = grunt.util._;

  var taskFunction = function () {
    var options = this.options({
      version: 'latest',
    });

    var removeInvalidFiles = function(files) {
      return files.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
    };

    this.files.forEach(function (f) {
      var validFiles = removeInvalidFiles(f);
      var destFiles  = f.dest;

      async.waterfall([function (callback) {
        tvm.install(options.version, callback);
      }, function (callback) {
        tvm.use(options.version, callback);
      }, function (callback) {
        tvm.tsc(validFiles + ' --out ' + destFiles, callback);
      }, function () {
        grunt.log.writeln('Done.');
      }]);
    });
  };

  grunt.registerMultiTask(taskName, description, taskFunction);
};
