import React from 'react'
import Helmet from 'react-helmet'
import Loadable from 'react-loadable'

import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import { createStore as _createStore, combineReducers } from 'redaction'

import routes from 'redux/routes'
import localReducers from 'redux/reducers'
import routingReducer from 'redux/reducers/routing'

import translationMessages from 'helpers/i18n'
import LanguageProvider from 'containers/LanguageProvider/LanguageProvider'
import ContextProvider from 'containers/ContextProvider/ContextProvider'


const createStore = (initialState) => _createStore({
  reducers: {
    ...combineReducers(localReducers),
    routing: routingReducer,
  },
  middleware: [
    routerMiddleware(browserHistory),
  ],
  enhancers: [
    batchedSubscribe(batchedUpdates),
  ],
  initialState,
})

export {
  Helmet,
  Loadable,

  routes,
  createStore,

  translationMessages,
  LanguageProvider,
  ContextProvider,
}
