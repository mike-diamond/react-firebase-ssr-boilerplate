import webpack from 'webpack'
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


webpackConfig.plugins.push(
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
