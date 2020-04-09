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
      params: {
        '$limit': '5000', 
        '$$app_token': functions.config().soda.token
      }
    })
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}


//params cloud function
const covidFunctionParms = {
  timeoutSeconds: 200,
  memory: '256MB'
}

//cloud functions
exports.getCovidDataApi = functions.pubsub.schedule('0 12 * * *')
  .runWith(covidFunctionParms)
  .timeZone('America/Bogota')
  .onRun(async(context) => {
    const covidData = await getDataApi(URL_COVID)
    if (covidData) {
      covidData.forEach(async(document) => {
        await db.collection('covid-data').doc(document.id_de_caso).set(document)
      })
    }
  })

