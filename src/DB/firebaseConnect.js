import  firebase from 'firebase';

 const firebaseConfig = {
    apiKey: "AIzaSyA4G_Gi8Op5bfe6ZP4Ed8M3WduujPv1V9I",
    authDomain: "appp-3aafc.firebaseapp.com",
    databaseURL: "https://appp-3aafc-default-rtdb.firebaseio.com",
    projectId: "appp-3aafc",
    storageBucket: "appp-3aafc.appspot.com",
    messagingSenderId: "802847884465",
    appId: "1:802847884465:web:de1646fe20c7eda34ece90",
    measurementId: "G-K0B9E4248G"
  };
 const firebasseConnect= firebase.initializeApp(firebaseConfig);
  export default firebaseConnect;
