const admin = require('firebase-admin')
const functions = require('firebase-functions');

//initializers
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

exports.db = db