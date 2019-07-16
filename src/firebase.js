import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBUdcVobhuUV-n2Cv93Y8uRmsoGhsa_v8c",
    authDomain: "commentsdoisdevreact.firebaseapp.com",
    databaseURL: "https://commentsdoisdevreact.firebaseio.com",
    projectId: "commentsdoisdevreact",
    storageBucket: "commentsdoisdevreact.appspot.com",
    messagingSenderId: "1076794335764"
  };
  firebase.initializeApp(config);

  export const database = firebase.database()
  export const auth = firebase.auth()