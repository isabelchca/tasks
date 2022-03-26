import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDvHYDDcQlrMGwFkvxmq1VNx_U2xOEDc4Q",
    authDomain: "crud-udemy-react-b6480.firebaseapp.com",
    projectId: "crud-udemy-react-b6480",
    storageBucket: "crud-udemy-react-b6480.appspot.com",
    messagingSenderId: "211958513421",
    appId: "1:211958513421:web:42c57847340cac37297a44"
  };
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()

  export {db, auth}
