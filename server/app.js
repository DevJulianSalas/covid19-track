
const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next, ) {

  fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: process.env.MONGO_DB_CONNECTION
  })
  
  console.log('sss')

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
