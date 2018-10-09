const path      = require('path')
const modPath   = require('app-module-path')
const config    = require('../site/client/local_modules/app-config')


config.modules.forEach((modulePath) => {
  modPath.addPath(path.join(process.cwd(), modulePath))
})


require('@babel/register')
require('@babel/polyfill')
