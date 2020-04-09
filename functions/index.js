//imports
const axios = require('axios')
const functions = require('firebase-functions');
const admin = require('firebase-admin')

//initializers
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();



//const
const URL_COVID = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'


//axios helper
const getDataApi = async(url) => {
  try {
    const { status, data } = await axios.get(url, {
      '$limit': '5000', '$$app_token': functions.config().soda.token
    })
    console.log(status)
    console.log(data)
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}


//cloud functions
exports.getCovidDataApi = functions.pubsub.schedule('*/2 * * * *')
  .timeZone('America/Bogota')
  .onRun(async(context) => {
    const covidData = await getDataApi(URL_COVID)
    console.log('*****')
    console.log(covidData)
    console.log('*****')
    if (covidData) {
      for (const document of covidData) {
        db.collection('covid-data').doc(document.id_de_caso).set(document)
      }
    }
  })