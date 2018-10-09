import { match } from 'react-router'
import { Loadable, routes, createStore } from 'functions/site-build/server'

import getHtml from './getHtml'
import getInitialState from './getInitialState'


export default async (req, res) => {
  const { headers, originalUrl, isBot, isMobile, isTablet, isDesktop } = req

  let redirectLink

  const globals = {
    isBot,
    isMobile,
    isTablet,
    isDesktop,
    setRedirectLink: (link) => redirectLink = link,
  }

  if (originalUrl === '/reset') {
    const { resetData } = require('./firebase-db')

    return resetData()
      .then(() => res.redirect(302, '/'))
  }

  match({ routes, location: originalUrl }, async (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      const initialState  = await getInitialState(headers)
      const store         = createStore({
        ...initialState,
        routing: {
          locationBeforeTransitions: renderProps.location,
        },
      })

      await Loadable.preloadAll()

      res
        .status(200)
        .send(getHtml({ store, globals, renderProps }))
    }
    else {
      res.redirect(302, '/')
    }
  })
}
