const path = require('path')


const rootPath  = path.resolve(process.cwd(), '../')
const basePath  = path.resolve(__dirname, '../')
const entry     = process.env.ENTRY || process.env.CONFIG.split('.')[0]
const port      = 4000


process.env.DEBUG       = 'app:*'
process.env.BABEL_ENV   = entry


const config = {
  config: process.env.CONFIG,
  entry,

  paths: {
    root:     (file = '') => path.join(rootPath, file),
    base:     (file = '') => path.join(basePath, file),
    site:     (file = '') => path.join(basePath, 'site', file),
    server:   (file = '') => path.join(basePath, 'server', file),
  },

  publicPath: '/assets/',

  http: {
    host: 'localhost',
    port,
  },

  modules: [
    'local_modules',
    'node_modules',
  ],
}


module.exports = config
