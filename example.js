'use strict'

const serve = require('./')
const Koa = require('koa')
const app = new Koa()

// $ GET /robots.txt

const servlets = new Map([
  ['/robots.txt', `${__dirname}/test/fixtures`]
])

app.use(serve(servlets))

app.use(async (ctx, next) => {
  await next()
})

app.listen(3000)

console.log('listening on port 3000')
