import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from 'app-config'

import webpackConfig from './default'


webpackConfig.entry = {
  'client': config.paths.site('client/dev.js'),
}

webpackConfig.output = {
  path: config.paths.base('site-build'),
  filename: '[name].js',
  chunkFilename: '[id].chunk.js',
  publicPath: config.publicPath,
}

webpackConfig.devtool = 'cheap-module-source-map'

webpackConfig.devServer = {
  publicPath: config.publicPath,
  clientLogLevel: 'error',
  stats: 'errors-only',
  compress: true,
}

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    title: 'React firebase SSR boilerplate',
    template: config.paths.site('client/index.html'),
    // favicon: config.paths.site('assets/favicon-32x32.png'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
  }),
)

webpackConfig.optimization = {
  namedModules: true,
  namedChunks: true,
  minimize: false,
}


export default webpackConfig
