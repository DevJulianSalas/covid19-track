//imports
const axios = require('axios')
const functions = require('firebase-functions');
const admin = require('firebase-admin')

//initializers
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();



//const
const URL_COVID = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'
const URL_METADATA = 'https://www.datos.gov.co/api/views/metadata/v1/gt2j-8ykr'

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

const getMetadataApi = async(url) => {
  try {
    const { status, data } = await axios.get(url, {})
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

//helpers
const setCovidData = async() => {
  try {
    const data = await getDataApi(URL_COVID)
    if (data) {
      data.forEach(async(document) => {
          await db.collection('covid-data').doc(document.id_de_caso).set(document)
      })
    }
  } catch (error) {
    console.log(error)
  }
}


//params cloud function
const covidFunctionParms = {
  timeoutSeconds: 500,
  memory: '256MB'
}

//cloud functions
exports.getCovidDataApi = functions
  .runWith(covidFunctionParms)
  .firestore.document('covidmetadata/{covidmetadataId}').onCreate((snap, context) => {
  var message = snap.data();
  return db.collection('covidmetadata')
    .orderBy('timestampUpdatedAt', 'DESC')
    .limit(1)
    .get()
    .then(snapshot => {
      if(!snapshot.empty){
        snapshot.forEach(async(doc) => {
          console.log(message.timestampUpdatedAt.toDate())
          console.log(doc.data().timestampUpdatedAt.toDate())
          if (message.timestampUpdatedAt.toDate() > doc.data().timestampUpdatedAt.toDate()){
            setCovidData()
          } else {
            console.log('no hay actualizaciones')
          }
        });
      }
    })
})

exports.getMetadataCovid = functions
  .runWith(covidFunctionParms)
  .pubsub.schedule('0 12 * * *')
  .onRun(async(context) => {
    const covidMeta = await getMetadataApi(URL_METADATA)
    if (covidMeta) {
      const { 
        id,
        name,
        dataUpdatedAt,
        dataUri,
        domain
        } = covidMeta
      const timestampUpdatedAt = admin.firestore.Timestamp.fromDate(new Date(dataUpdatedAt))
      return db.collection('covidmetadata').doc().set({id, name, timestampUpdatedAt, dataUri, domain})
    }
    return 'Has ocurred an error get data from soda api'
  })
