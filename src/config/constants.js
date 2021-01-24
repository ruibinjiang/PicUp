import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDn-aqkQZW1hz_KkfG_op7_UAGjlJtc_E0",
    authDomain: "fitcheck-ec654.firebaseapp.com",
    projectId: "fitcheck-ec654",
    storageBucket: "fitcheck-ec654.appspot.com",
    messagingSenderId: "58509163620",
    appId: "1:58509163620:web:e9611896f171d374813371",
    measurementId: "G-W2CRJZMM19"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({ timestampsInSnapshots: true });