import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import historyApiFallback from 'connect-history-api-fallback'


let httpServer

const app          = express()
const isLocalTest  = process.env.CONFIG === 'site.client.server'

app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ strict: true, limit: '10mb' }))
app.use(historyApiFallback())

if (process.env.CONFIG === 'site.client.dev') {
  const webpackMiddleware  = require('webpack-dev-middleware')
  const webpack            = require('webpack')
  const webpackConfig      = require('../../webpack/site/dev').default
  const compiler           = webpack(webpackConfig)

  app.use(webpackMiddleware(compiler, webpackConfig.devServer))

  httpServer = http.createServer(app)
}
else if (isLocalTest) {
  const config = require('app-config')

  app.use(config.publicPath, express.static(config.paths.base('functions/site-build'), { maxAge: '200d' }))
  app.use(require('../shared/middleware').urlParser)
  app.use(require('../shared/middleware').device)
  app.use(require('./middleware/ssr').default)

  httpServer = http.createServer(app)
}
else {
  app.use('/assets', express.static('./site-build', { maxAge: '200d' }))
  app.use(require('./urlParser').default)
  app.use(require('./device').default)
  app.use(require('./ssr').default)

  httpServer = app
}


export default httpServer
