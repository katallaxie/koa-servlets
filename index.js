'use strict'

/**
 * Module dependencies.
 */

const debug = require('debug')('koa-static')
const {
  resolve
} = require('path')
const send = require('koa-send')

/**
 * Expose `serve()`.
 */

module.exports = serve

/**
 * Serve a file at a given path from a given `root`.
 *
 * @param {Map} servlets
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve (servlets, opts) {
  opts = Object.assign({}, opts)

  // options
  debug('serve "%s" %j', servlets, opts)

  return async function serve (ctx, next) {
    await next()

    if (servlets.has(ctx.path) === false) return
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return

    opts.root = resolve(servlets.get(ctx.path))

    try {
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
}
