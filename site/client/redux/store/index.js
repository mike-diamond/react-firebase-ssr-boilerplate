import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers } from 'redaction'

import firebase from 'firebase'
import fbConfig from 'firebase-config.json'
import {
  reduxFirebase,
  firebaseReducer,
  // reduxFirestore, // uncomment if you using firestore
  // firestoreReducer, // uncomment if you using firestore
} from 'firebase-connect'

import localReducers from 'redux/reducers'
import routingReducer from 'redux/reducers/routing'


firebase.initializeApp(fbConfig)
// firebase.firestore().settings({ timestampsInSnapshots: true }) // uncomment if you using firestore

const middleware = [
  routerMiddleware(browserHistory),
]

const enhancers = []

try {
  if (XMLHttpRequest) {
    enhancers.push(
      // reduxFirestore(firebase), // uncomment if you using firestore
      reduxFirebase(firebase, { userProfile: 'users' })
    )
  }
} catch(e) {
}

const _createStore = (initialState) => {
  const store = createStore({
    enhancers,
    middleware,
    initialState,
    reducers: {
      ...combineReducers(localReducers),
      firebase: firebaseReducer,
      // firestore: firestoreReducer, // uncomment if you using firestore
      routing: routingReducer,
    },
  })

  return store
}


export default _createStore
