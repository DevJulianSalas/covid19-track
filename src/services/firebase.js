import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_DOMAIN_FIREBASE,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: "covid19-track-7231c",
  storageBucket: "covid19-track-7231c.appspot.com",
  messagingSenderId: "484808473207",
  appId: process.env.REACT_APP_APPID,
  measurementId: "G-X7Q08DCMV7"
};
firebase.initializeApp(config);
export default firebase;