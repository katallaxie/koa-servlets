# koa-static

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Koa-servlet is a wrapper for [`koa-send`](https://github.com/koajs/send) which allows to serve a given file path from a given `root`.

## Installation

```bash
$ npm install koa-servlet
```

## API

```js
const Koa = require('koa');
const app = new Koa();
app.use(require('koa-servlets')(servlets, opts));
```

* `servlets` is a `Map` of paths and `roots`.
* `opts` options object, which reflects to [`koa-send`](https://github.com/koajs/send) options.

### Options

 - `maxage` Browser cache max-age in milliseconds. defaults to 0
 - `hidden` Allow transfer of hidden files. defaults to false
 - `index` Default file name, defaults to 'index.html'
 - `defer` If true, serves after `return next()`, allowing any downstream middleware to respond first.
 - `gzip`  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
 - `br`  Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
 - [setHeaders](https://github.com/koajs/send#setheaders) Function to set custom headers on response.
 - `extensions` Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to `false`)

## Example

```js
const serve = require('koa-servlets');
const Koa = require('koa');
const app = new Koa();

// $ GET /robots.txt

const servlets = new Map([
  ['/robots.txt', __dirname + '/test/fixtures/robots.txt']
]);

// or use absolute paths
app.use(serve(servlets));

app.listen(3000);

console.log('listening on port 3000');
```

### See also

 - [koajs/conditional-get](https://github.com/koajs/conditional-get) Conditional GET support for koa
 - [koajs/compress](https://github.com/koajs/compress) Compress middleware for koa
 - [koajs/mount](https://github.com/koajs/mount) Mount `koa-static` to a specific path

## License
[MIT](/LICENSE)

[npm-image]: https://img.shields.io/npm/v/koa-static.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-servlets
[github-tag]: http://img.shields.io/github/tag/katallaxie/koa-servlets.svg?style=flat-square
[github-url]: https://github.com/katallaxie/koa-servlets/tags
[travis-image]: https://img.shields.io/travis/katallaxie/koa-servlets.svg?style=flat-square
[travis-url]: https://travis-ci.org/katallaxie/koa-servlets
[coveralls-image]: https://img.shields.io/coveralls/katallaxie/koa-servlets.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/katallaxie/koa-servlets?branch=master
[david-image]: http://img.shields.io/david/katallaxie/koa-servlets.svg?style=flat-square
[david-url]: https://david-dm.org/katallaxie/koa-servlets
[license-image]: http://img.shields.io/npm/l/koa-static.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/koa-static.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/koa-static
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/
