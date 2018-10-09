import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import StyleLintPlugin from 'stylelint-webpack-plugin'
// import BundleAnalyzer from 'webpack-bundle-analyzer'
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
  // noInfo: false,
  // quiet: false,
  // lazy: false,
}

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    title: 'Island Quiz',
    template: config.paths.site('client/index.html'),
    // favicon: config.paths.site('assets/favicon-32x32.png'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
    // chunksSortMode: function (a, b) {
    //   const orders = ['manifest', 'vendor', 'site'];
    //   return orders.indexOf(a.names[0]) - orders.indexOf(b.names[0]);
    // }
  }),

  // new StyleLintPlugin({
  //   configFile: '.stylelintrc',
  //   files: '**/*.scss',
  //   failOnError: false,
  // })

  // new BundleAnalyzer.BundleAnalyzerPlugin({
  //   // Can be `server`, `static` or `disabled`.
  //   // In `server` mode analyzer will start HTTP server to show bundle report.
  //   // In `static` mode single HTML file with bundle report will be generated.
  //   // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
  //   analyzerMode: 'server',
  //   // Host that will be used in `server` mode to start HTTP server.
  //   analyzerHost: '127.0.0.1',
  //   // Port that will be used in `server` mode to start HTTP server.
  //   analyzerPort: 8888,
  //   // Path to bundle report file that will be generated in `static` mode.
  //   // Relative to bundles output directory.
  //   reportFilename: 'report.html',
  //   // Module sizes to show in report by default.
  //   // Should be one of `stat`, `parsed` or `gzip`.
  //   // See "Definitions" section for more information.
  //   defaultSizes: 'parsed',
  //   // Automatically open report in default browser
  //   openAnalyzer: true,
  //   // If `true`, Webpack Stats JSON file will be generated in bundles output directory
  //   generateStatsFile: false,
  //   // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
  //   // Relative to bundles output directory.
  //   statsFilename: 'stats.json',
  //   // Options for `stats.toJson()` method.
  //   // For example you can exclude sources of your modules from stats file with `source: false` option.
  //   // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  //   statsOptions: null,
  //   // Log level. Can be 'info', 'warn', 'error' or 'silent'.
  //   logLevel: 'info',
  // }),
)

webpackConfig.optimization = {
  namedModules: true,
  namedChunks: true,
  minimize: false,
}

export default webpackConfig
