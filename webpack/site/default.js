import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import AppConfigPlugin from 'app-config/webpack'
import config from 'app-config'
import rulesMap from './rules'


const rules = Object.keys(rulesMap)
  .map((k) => rulesMap[k])
  .map((rule) => Array.isArray(rule) ? rule : (rule.default || rule[config.env]))
  .reduce((result, rule) => result.concat(rule), [])

const globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  'process.env.ENTRY': JSON.stringify(config.entry),
  'process.env.WEBPACK': JSON.stringify(config.webpack),
  __CONFIG__: JSON.stringify(config),
}

const webpackConfig = {

  module: {
    rules,
  },

  resolve: {
    alias: {
      'client': config.paths.site('client'),
    },
    modules: config.modules.map((modulePath) => config.paths.base(modulePath)),
    extensions: [ '.js', '.jsx', '.scss' ],
    plugins: [],
  },

  plugins: [
    new AppConfigPlugin(),
    new webpack.DefinePlugin(globals),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({ clear: false }),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en-gb|es/
    ),
  ],
}


export default webpackConfig
