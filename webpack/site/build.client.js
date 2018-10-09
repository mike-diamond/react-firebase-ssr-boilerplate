import webpack from 'webpack'
import config from 'app-config'
import AssetsPlugin from 'assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ReactLoadablePlugin } from 'react-loadable/webpack'
import MediaQuerySplittingPlugin from 'media-query-splitting-plugin'

import webpackConfig from './default'


const outputPath = config.paths.base('functions/site-build')

webpackConfig.entry = {
  'site': config.paths.site('client/index.js'),
}

webpackConfig.output = {
  path: outputPath,
  filename: '[name].[contenthash].js',
  chunkFilename: '[id].[contenthash].chunk.js',
  publicPath: config.publicPath,
}

webpackConfig.plugins.push(
  new AssetsPlugin({
    filename: 'assets.json',
    path: outputPath,
    fullPath: false,
    update: true,
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
  }),
  new MediaQuerySplittingPlugin(),
  new ReactLoadablePlugin({
    filename: config.paths.base('functions/site-build/react-loadable.json'),
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    append: `\n//# sourceMappingURL=[url]`,
  }),
)

webpackConfig.optimization = {
  minimize: false,
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all'
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
    },
  },
  runtimeChunk: {
    name: 'vendors',
  },
}


export default webpackConfig
