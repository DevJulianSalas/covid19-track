const schemas = require('../../schemas/measurements')

const getMeasurements = async(col, city) => {
  let measur1,measur2, measur3, measur4  = null
  if (!city) {
     measur1 = await col.count()
     measur2 = await col.find({estado:'Fallecido'}).count()
     measur3 = await col.find({atenci_n:'Recuperado'}).count()
     measur4 = await col.find({estado:'Leve'}).count()
  } else {
     measur1 = await col.find({ciudad_de_ubicaci_n: city}).count()
     measur2 = await col.find({ciudad_de_ubicaci_n: city, estado:'Fallecido'}).count()
     measur3 = await col.find({ciudad_de_ubicaci_n: city, atenci_n:'Recuperado'}).count()
     measur4 = await col.find({ciudad_de_ubicaci_n: city, estado:'Leve'}).count()
  }
  return { 
    'infected': measur1,
    'deceased': measur2, 
    'recover': measur3, 
    'mild': measur4 
  }
}

module.exports = async function (fastify, opts) {
  fastify.get('/measurements/:city', async function (request, reply) {
    const city = request.params.city
    let resp = null
    const col = this.mongo.db.collection('measurements')
    const cityMatch = await this.mongo.db.collection('cities')
      .find({'$text': {'$search': city, "$caseSensitive": false}})
      .limit(1)
      .toArray()
    
    if (cityMatch.length > 0) {
      const { cuidad } = cityMatch[0]
      resp = await getMeasurements(col, cuidad)
    } else {
      resp = await getMeasurements(col, '')
    }
    return resp
  })
  fastify.post(
    '/measurements',
    { schema: schemas.insertCovData },
    async function(request, reply){
      try {
        const data = Object.assign(request.body)
        const col = this.mongo.db.collection('measurements').initializeOrderedBulkOp()
        data.forEach(element => {
          col.find({'id_de_caso': element.id_de_caso}).upsert().updateOne(element)
        });
        const { result } = await col.execute()
        const { ok, nUpserted } = result
        return { ok, nUpserted }
      } catch (error) {
        return error
      }
    }
  )
  fastify.post(
    '/cities/',
     { schema: schemas.insertCities },
    async function (request, reply) {
      const cities = Object.assign(request.body)
      const inserts = []
      try {
        for (const city of cities) {
          const { result } = await this.mongo.db.collection('cities')
            .updateOne(city, { $set: city }, { upsert: true })
          inserts.push(result)
        }
        return inserts[0]
      } catch (error) {
        return error
      }
  })
  fastify.get(
    '/cities/',
    async function (request, reply) {
      return this.mongo.db
        .collection('cities')
        .find()
        .toArray()
    }
  )
}
