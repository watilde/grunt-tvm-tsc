# grunt-tvm-tsc
> Compile TypeScript files to JavaScript with TypeScript Version Manager.

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
