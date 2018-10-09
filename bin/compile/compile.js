import webpack from 'webpack'
import chalk from 'chalk'
import _debug from 'debug'
import config from '../../site/client/local_modules/app-config'


const webpackConfig   = require(`../../webpack/${config.entry}/${config.webpack}`).default
const debug           = _debug('app:bin:compile')
const compiler        = webpack(webpackConfig)

debug(`config:    ${config.config}`)
debug(`env:       ${config.env}`)
debug(`entry:     ${config.entry}`)
debug(`webpack:   ${config.webpack}`)
debug(`babel env: ${process.env.BABEL_ENV}`)

debug('\nWebpack compiler starting to build')

compiler.run((err, stats) => {
  const jsonStats = stats.toJson()
  const { errors, warnings } = jsonStats

  debug('Compilation completed!')

  console.log(stats.toString({
    colors: true,
    children: false,
    chunks: false,
  }))

  if (err) {
    debug(chalk.red(err))
    process.exit(1)
  }
  else if (errors && errors.length) {
    debug(chalk.red(jsonStats.errors))
    process.exit(1)
  }
  else if (warnings && warnings.length) {
    // debug(chalk.yellow(jsonStats.warnings))
  }

  debug('All done - everything is good to go.')
  process.exit(0)
})
