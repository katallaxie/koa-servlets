'use strict'

const request = require('supertest')
const assert = require('assert')
const serve = require('..')
const Koa = require('koa')
const {
  resolve
} = require('path')

const fixtures = resolve(__dirname, 'fixtures')

describe('serve', function () {
  describe('serve a given path from given root', function () {
    it('should respond (200)', function (done) {
      const app = new Koa()

      const servlets = new Map([
        ['/robots.txt', fixtures]
      ])

      app.use(serve(servlets))

      request(app.listen())
        .get('/robots.txt')
        .expect(200, done)
    })

    it('when path is not matching (404)', function (done) {
      const app = new Koa()

      const servlets = new Map([
        ['/robots.txt', fixtures]
      ])

      app.use(serve(servlets))

      request(app.listen())
        .get('/robotz.txt')
        .expect(404, done)
    })

    it('when the method is post (404)', function (done) {
      const app = new Koa()

      const servlets = new Map([
        ['/robots.txt', fixtures]
      ])

      app.use(serve(servlets))

      request(app.listen())
        .post('/robots.txt')
        .expect(404, done)
    })

    it('when reponds and other middleware could answer (200)', function (done) {
      const app = new Koa()

      const servlets = new Map([
        ['/robots.txt', fixtures]
      ])

      app.use(serve(servlets))

      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = 'hey'
        })
      })

      request(app.listen())
        .get('/robots.txt')
        .expect(200)
        .end((_, res) => {
          assert.notEqual(res.text, 'hey')
          done()
        })
    })

    it('when the method is post and other middleware responds (200)', function (done) {
      const app = new Koa()

      const servlets = new Map([
        ['/robots.txt', fixtures]
      ])

      app.use(serve(servlets))

      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = 'hey'
        })
      })

      request(app.listen())
        .post('/robots.txt')
        .expect(200)
        .end((_, res) => {
          assert.equal(res.text, 'hey')
          done()
        })
    })
  })
})
