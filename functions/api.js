const { db } = require('./db')
const functions = require('firebase-functions');


exports.getCountries = functions.https.onRequest(async(req, res) => {
  try {
    const snapshotCities = await db.collection('covid-data')
      .select('ciudad_de_ubicaci_n').get()
    if (!snapshotCities.empty){
      const cities = snapshotCities.map(doc => doc.data())
      return res.status(200).json(cities)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({'error': true})
  }
});