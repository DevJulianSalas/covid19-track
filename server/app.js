
const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next, ) {
  fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: process.env.MONGO_DB_CONNECTION
  })

  fastify.register(require('fastify-cors'), {
    origin: '*',
    allowedHeaders: ['authorization', 'content-type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['authorization'],
    maxAge: 13000,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    preflight: false
  })
  
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })
  next()
}
