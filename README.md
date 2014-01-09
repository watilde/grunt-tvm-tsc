# grunt-tvm-tsc
> Compile TypeScript files to JavaScript with TypeScript Version Manager.

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tvm-tsc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tvm-tsc');
```

## Compile TypeScript with Version Manager task

_Run this task with the `grunt tvm_tsc` command._


## Usage Examples

```js
tvm_tsc: {
  all: {
    options: {
      version: '0.9.5'
    },
    files: {
      'path/to/result.js': 'path/to/source.ts'
    }
  }
}
```
