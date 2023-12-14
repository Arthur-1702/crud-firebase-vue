import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXvuKIlfbJ0ykk1t6ZOXfHT_KvsZaiP_M",
  authDomain: "sakai-ng-9fea3.firebaseapp.com",
  databaseURL: "https://sakai-ng-9fea3-default-rtdb.firebaseio.com",
  projectId: "sakai-ng-9fea3",
  storageBucket: "sakai-ng-9fea3.appspot.com",
  messagingSenderId: "1032267860367",
  appId: "1:1032267860367:web:8ec4e19cd8afff522923fa",
  measurementId: "G-N3ZW51X7JT"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
