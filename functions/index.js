//imports
const axios = require('axios')
const { authorizeGmail, setCodeCredentials, watchEmail } = require('./gmailApi')
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const { db } = require('./db')

//endpoints
exports.api = require('./api')


//const
const URL_API = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'
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

//params cloud function
const runningParams = {
  timeoutSeconds: 500,
  memory: '256MB'
}

//cloud functions
exports.getDataApi = functions
  .runWith({memory: '512MB'})
  .pubsub
  .topic(functions.config().gdcloud.topicname)
  .onPublish(async(message) => {
    const promises = []
    const data = await getDataApi(URL_API)
    data.forEach(document => {
      const insertDoc = db.collection('covid-data').doc(document.id_de_caso).set(document)
      promises.push(insertDoc)
    })
    return Promise.all(promises)
  })

exports.getMetadataApi = functions
  .runWith(runningParams)
  .topic(functions.config().gdcloud.topicname)
  .onRun(async(context) => {
    const covidMeta = await getMetadataApi(URL_METADATA)
    if (covidMeta) {
      const { id, name, dataUpdatedAt, dataUri, domain } = covidMeta
      const timestampUpdatedAt = admin.firestore.Timestamp.fromDate(new Date(dataUpdatedAt))
      return db.collection('covidmetadata').doc().set({id, name, timestampUpdatedAt, dataUri, domain})
    }
    return 'error from soda api'
  })

exports.getGmailAuth = functions
  .runWith(runningParams)
  .https
  .onRequest((req, res) => {
    const url = authorizeGmail()
    if (url) {
      console.log(url)
      return res.send('check the Authorize url in your terminal')
    }
    return res.send('it seems that you already got a token')
  })

exports.setAuthToken = functions
  .runWith(runningParams)
  .https
  .onRequest(async(req, res) => {
    const code  = req.query.code
    if (code) {
      return setCodeCredentials(code, ( tokenAtFirst, err) => {
        if (err) return res.send('oops, an unexpected error occurred try again')
        return db.collection('auth-meta').doc('gmail').set(tokenAtFirst, {merge: true})
          .then((resp) => {
            return res.send('authorization was successfully, check token in folder root')
          })
          .catch((err) => {
            return res.send('error inserting auth-meta doc try again')
          })
      })
    }
    return res.send('make sure you redirect from oauth google server to get code')
  })


exports.subscribePushNotificationGmail = functions
  .runWith(runningParams)
  .https
  .onRequest((req, res) => {
    db.collection('auth-meta').doc('gmail')
      .get()
      .then(snapshot => {
        if (!snapshot.empty){
          watchEmail(snapshot.data(), (data, err) => {
            if (err) return res.send('The API returned an error: ' + err);
            return res.send('subscription was successfuly')
          })
        } else {
          return res.send('auth-metadata not found')
        }
      })
      .catch((err) => {
        console.log(err)
        return res.send('oops, an unexpected error ocurred try again')
      })
  })