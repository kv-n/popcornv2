import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBKSaib-aW924ti3AK5ZwYzRENNQg96myI",
    authDomain: "popcorn-v2.firebaseapp.com",
    databaseURL: "https://popcorn-v2.firebaseio.com",
    projectId: "popcorn-v2",
    storageBucket: "popcorn-v2.appspot.com",
    messagingSenderId: "180009873353"
  };

  firebase.initializeApp(config);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()


  export {
    db,
    auth,
    storage
  }

  export default firebase