import { firebaseSettings } from "./firebaseSettings";

export const environment = {
  production: true,
  firebase: {
    apiKey: firebaseSettings.apiKey,
    authDomain: firebaseSettings.authDomain,
    databaseURL: firebaseSettings.databaseURL,
    projectId: firebaseSettings.projectId,
    storageBucket: firebaseSettings.storageBucket,
    messagingSenderId: firebaseSettings.messagingSenderId,
    appId: firebaseSettings.appId,
    measurementId: firebaseSettings.measurementId
  },
};
