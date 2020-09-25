import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/Reducers";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance, getFirestore } from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8bioKeANJq-SRcGPmJvzRuKOeV9sHwhI",
  authDomain: "algram-319de.firebaseapp.com",
  databaseURL: "https://algram-319de.firebaseio.com",
  projectId: "algram-319de",
  storageBucket: "algram-319de.appspot.com",
  messagingSenderId: "57007304770",
  appId: "1:57007304770:web:fb1d050155369239643ddb",
};
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirestore }))
);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
export { firebase };
serviceWorker.unregister();
