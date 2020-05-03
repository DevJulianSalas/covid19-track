
const schemas = require('../../schemas/metadata')


module.exports = async function (fastify, opts) {
  
  fastify.get('/metadata', async function (request, reply) {
    try {
      return this.mongo.db
        .collection('metadata')
        .find()
        .sort({ metadataUpdatedAt: -1 })
        .limit(1)
        .toArray()
    } catch (err) {
      return err
    }
  })
  
  fastify.post(
    '/metadata',
    { schema: schemas.insertMeta },
    async function(request, reply) {
      const data = Object.assign(request.body)
      const query = { 'metadataUpdatedAt': data.metadataUpdatedAt }
      try {
        const { result } = await this.mongo.db.collection('metadata')
          .updateOne(query, { $set: data }, { upsert: true })
        return result
      } catch (err) {
        return err
      }
  })
}
