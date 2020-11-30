import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";

import { config } from "../../env";

if (!firebase.apps.length) {
  firebase.initializeApp({
    projectId: "jeffjohn3-codenames",
    appId: "1:858983829224:web:6b86a0ab3b081aa83d435d",
    databaseURL: "https://jeffjohn3-codenames.firebaseio.com",
    storageBucket: "jeffjohn3-codenames.appspot.com",
    locationId: "us-west2",
    apiKey: "AIzaSyAG1hpN1dSYnSuvZlwPNxnTmyXYnHhEfX8",
    authDomain: "jeffjohn3-codenames.firebaseapp.com",
    messagingSenderId: "858983829224",
    measurementId: "G-FKYN8C9E3S",
  });
}

export const database = firebase.database();
export const auth = firebase.auth();
// export const analytics = firebase.analytics();

export const databaseServerTimestamp = firebase.database.ServerValue.TIMESTAMP;
