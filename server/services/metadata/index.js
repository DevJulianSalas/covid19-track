module.exports = async function (fastify, opts) {
  fastify.get('/metadata', async function (request, reply) {
    return 'this is metadata'
  })
}
