import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import store from './store'

import App from './App';

import firebase from "firebase/compat";
import 'firebase/firestore'
import 'firebase/auth'


firebase.initializeApp({
    apiKey: "AIzaSyAzbNkLYbVtkGKN4RtJ8_MFFVfWFpogf50",
    authDomain: "shop-react-e1241.firebaseapp.com",
    projectId: "shop-react-e1241",
    storageBucket: "shop-react-e1241.appspot.com",
    messagingSenderId: "387515580583",
    appId: "1:387515580583:web:c338c262e63d45e4bfdb82",
    measurementId: "G-X0DBRH2KKP"
})

export const Context = createContext(null)


const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Context.Provider value={{
              firebase,
              auth,
              firestore
          }}>
              <App />
          </Context.Provider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

