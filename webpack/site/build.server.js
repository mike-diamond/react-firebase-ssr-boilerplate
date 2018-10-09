import webpack from 'webpack'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import config from 'app-config'

import webpackConfig from './default'


webpackConfig.entry = {
  'server': config.paths.site('server/index.js'),
}

webpackConfig.target = 'node'

webpackConfig.output = {
  path: config.paths.base('functions/site-build'),
  filename: '[name].js',
  publicPath: config.publicPath,
  libraryTarget: 'commonjs2',
}

webpackConfig.externals = [
  'react-helmet',
]

// webpackConfig.module.rules = webpackConfig.module.rules.map((loader) => {
//   if (loader.test.test('*.css') || loader.test.test('*.scss')) {
//     loader.use = ExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: loader.use.slice(1),
//     })
//   }
//   return loader
// })

webpackConfig.plugins.push(
  // new webpack.IgnorePlugin(/\/iconv-loader$/),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
)

webpackConfig.node = {
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty',
  __filename: true,
  __dirname: true,
}

webpackConfig.optimization = {
  minimize: false,
}

export default webpackConfig
