module.exports = async function (fastify, opts) {
  fastify.get('/measurements', async function (request, reply) {
    return 'this is measurements'
  })
}
