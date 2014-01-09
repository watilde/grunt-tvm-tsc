module.exports = function(grunt) {
  'use strict';
  var taskName = 'tvm_tsc';
  var description = 'Compile TypeScript files into JavaScript with tvm';
  var async = require('async');
  var fs = require('fs');
  var tvm = require('tvm');

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

    var tvm_tsc = function (version, validFiles, destFiles) {
      async.waterfall([function (callback) {
        var exists = fs.existsSync(tvm.dirname.typescript + 'v' + version);
        if (exists) {
          callback();
        } else {
          tvm.install(options.version, callback);
        }
      }, function (callback) {
        tvm.use(options.version, callback);
      }, function () {
        tvm.tsc(validFiles + ' --out ' + destFiles);
        grunt.log.writeln('File ' + destFiles + ' created.');
      }]);
    };

    var done = this.async();

    this.files.forEach(function (f) {
      var validFiles = removeInvalidFiles(f);
      var destFiles  = f.dest;
      var version    = options.version;
      tvm_tsc(version, validFiles, destFiles);
    });
  };

  grunt.registerMultiTask(taskName, description, taskFunction);
};
