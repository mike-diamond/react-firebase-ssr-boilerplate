import _debug from 'debug'
import config from 'app-config'


const server  = require(`../../server/${config.entry}`).default
const debug   = _debug('app:bin:server')

debug(`config:    ${config.config}`)
debug(`env:       ${config.env}`)
debug(`entry:     ${config.entry}`)
debug(`webpack:   ${config.webpack}`)
debug(`babel env: ${process.env.BABEL_ENV}`)

server.listen(config.http.port, (err) => {
  if (err) {
    console.log(err)
  }
  debug(`\nServer starting at ${config.http.host}:${config.http.port}`)
})
