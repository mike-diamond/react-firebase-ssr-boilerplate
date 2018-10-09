import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { links } from 'helpers'
import Loadable from 'react-loadable'
import loading from 'components/ui/Loader/Loader'

import App from 'containers/App/App'

const ChatPage = Loadable({ loader: () => import('pages/ChatPage/ChatPage'), loading })


export default (
  <Route path={links.home} component={App}>
    <IndexRoute component={ChatPage} />
  </Route>
)
