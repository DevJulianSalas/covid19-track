const { google } = require('googleapis');
const functions = require('firebase-functions');
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];




//initial oauth set up
const {
  client_secret, 
  client_id, 
  redirect_uris
} = functions.config().oauthid.web

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

//auth
function authorizeGmail(){
  const token = functions.config().oauthid.token
  if (!token) return getUrlAuth()
}


function getUrlAuth() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return 'Authorize this app by visiting this url:' + authUrl

}


//set token
function setCodeCredentials(code, callback){
  return oAuth2Client.getToken(code, (err, token) => {
    if (err) return callback(token, err);
    callback(token, err)
  });
}


//get auth user
function setCredentials(token)  {
  oAuth2Client.setCredentials(token)
  return oAuth2Client
}
  

function watchEmail(token, callback) {
  const auth = setCredentials(token)
  const gmail = google.gmail({version: 'v1', auth});
  return gmail.users.watch({
    userId: 'me',
    resource: {
      labelIds: [functions.config().gdcloud.idlabel],
      topicName: functions.config().gdcloud.topicfullname

    }
  }, (err, res) => {
    callback(res, err)
  });
}

module.exports.authorizeGmail = authorizeGmail
module.exports.setCodeCredentials = setCodeCredentials
module.exports.setCredentials = setCredentials
module.exports.watchEmail = watchEmail