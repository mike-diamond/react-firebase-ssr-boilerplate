if (process.env.WEBPACK === 'build.client' || process.env.WEBPACK === 'site.dev') {
  module.exports = require('./client')
}
else {
  module.exports = require('./server')
}
