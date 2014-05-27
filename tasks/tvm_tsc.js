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
      sourceMap: false,
      target: 'es3',
      module: 'commonjs',
      declaration: false,
      removeComments: false
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

    var getOptions = function(){
      var option = '';
      if (options.sourceMap) option += ' --sourcemap ';
      if (options.target) option += ' --target ' + options.target + ' ';
      if (options.module) option += ' --module ' + options.module + ' ';
      if (options.declaration) option += ' --declaration ';
      if (options.removeComments) option += ' --removeComments ';
      return option;
    };

    var tvm_tsc = function (version, validFiles, destFiles, end) {
      var option = getOptions();
      async.waterfall([function (callback) {
        var exists = fs.existsSync(tvm.dirname.typescript + 'v' + version);
        if (exists) {
          callback();
        } else {
          tvm.install(options.version, callback);
        }
      }, function (callback) {
        tvm.use(options.version, callback);
      }, function (callback) {
          tvm.tsc(option + validFiles + ' --out ' + destFiles, callback);
      }, function () {
        grunt.log.writeln('File ' + destFiles + ' created.');
        end();
      }]);
    };

    var done  = this.async();
    var files = this.files;
    async.forEachSeries(files, function (file, callback) {
      var validFiles = removeInvalidFiles(file);
      var destFiles  = file.dest;
      var version    = options.version;
      tvm_tsc(version, validFiles, destFiles, callback);
    }, done);
  };

  grunt.registerMultiTask(taskName, description, taskFunction);
};
