import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDlfC1i3-wAwC3tt4UynVHrl1TNkyGMknQ",
    authDomain: "my-first-react-7b27b.firebaseapp.com",
    databaseURL: "https://my-first-react-7b27b.firebaseio.com",
    projectId: "my-first-react-7b27b",
    storageBucket: "my-first-react-7b27b.appspot.com",
    messagingSenderId: "639391121341",
    appId: "1:639391121341:web:c4d1f17488ba577b045cd4"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
export default firebase;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
