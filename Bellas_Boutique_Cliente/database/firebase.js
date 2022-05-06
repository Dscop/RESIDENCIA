import * as firebase from "firebase";
import 'firebase/firestore';
import "firebase/auth"
import 'firebase/storage'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCIOYmBtRaTs27nsrFbIGg7GGljJ5CwOPw",
  authDomain: "bellas-boutique-app.firebaseapp.com",
  //databaseURL: "YOUR_DATABASE_URL",
  projectId: "bellas-boutique-app",
  storageBucket: "bellas-boutique-app.appspot.com",
  messagingSenderId: "438125694594"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

const conexion = firebase.firestore()
export default {
    firebase,
    conexion,
}

export const auth = firebase.auth() 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()