import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_DOMAIN_FIREBASE,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: "covid19-track-7231c.appspot.com",
  messagingSenderId: "484808473207",
  appId: process.env.REACT_APP_APPID,
  measurementId: "G-X7Q08DCMV7"
};

firebase.initializeApp(config);
const db = firebase.firestore();
export default db;