import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const notesCollection = db.collection("notes");

export { firebase, db, notesCollection };
