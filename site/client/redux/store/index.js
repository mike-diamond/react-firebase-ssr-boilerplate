import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers } from 'redaction'

import firebase from 'firebase'
import fbConfig from 'firebase-config.json'
import { reactReduxFirebase, firebaseReducer } from 'firebase-connect'

import localReducers from 'redux/reducers'
import routingReducer from 'redux/reducers/routing'


firebase.initializeApp(fbConfig)

const middleware = [
  routerMiddleware(browserHistory),
]

const enhancers = []

try {
  if (XMLHttpRequest) {
    enhancers.push(reactReduxFirebase(firebase, { userProfile: 'users' }))
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
      routing: routingReducer,
    },
  })

  return store
}


export default _createStore
