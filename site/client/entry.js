import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router'

import translationMessages from 'helpers/i18n'
import LanguageProvider from 'containers/LanguageProvider/LanguageProvider'

import { createStore } from 'redux/core'
import routes from 'redux/routes'

import { renderToString } from 'react-dom/server'


const init = (initialState, isDev) => {
  const renderAction  = isDev ? ReactDOM.render : ReactDOM.hydrate
  const store         = createStore(initialState)
  const history       = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: ({ routing }) => routing,
  })

  return renderAction(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <Router history={history}>
          {routes}
        </Router>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  )
}


export default init
