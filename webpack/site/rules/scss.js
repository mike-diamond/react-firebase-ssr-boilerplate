import config from 'app-config'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'


const isServer        = config.webpack === 'build.server'
const isDevelopment   = config.env === 'development'
const compile         = isDevelopment ? 'sourceMap' : 'minimize'
const localIdentName  = isDevelopment ? '[local]__[hash:base64:3]' : '[hash:base64:3]'

let loaderConfig

if (isServer) {
  loaderConfig = [
    {
      loader: 'css-loader/locals',
      options: {
        // [compile]: true,
        // sourceMap: true,
        modules: true,
        localIdentName,
        // importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // sourceMap: true,
        plugins: () => [
          autoprefixer([
            'Android >= 4',
            'iOS >= 8',
            'Chrome >= 30',
            'Firefox >= 30',
            'Explorer >= 10',
            'Safari >= 8',
            'Opera >= 20',
          ]),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        // sourceMap: true,
        data: '@import "./helpers/scss/index";',
        includePaths: [
          config.paths.base('node_modules'),
          config.paths.site('client'),
          config.paths.site('shared'),
        ],
      },
    },
  ]
}
else if (isDevelopment) {
  loaderConfig = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: 'dashes',
        minimize: true,
        localIdentName,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [
          autoprefixer([
            'Android >= 4',
            'iOS >= 8',
            'Chrome >= 30',
            'Firefox >= 30',
            'Explorer >= 10',
            'Safari >= 8',
            'Opera >= 20',
          ]),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        data: '@import "./helpers/scss/index";',
        includePaths: [
          config.paths.base('node_modules'),
          config.paths.site('client'),
          config.paths.site('shared'),
        ],
      },
    },
  ]
}
else {
  loaderConfig = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: 'dashes',
        minimize: true,
        localIdentName,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [
          autoprefixer([
            'Android >= 4',
            'iOS >= 8',
            'Chrome >= 30',
            'Firefox >= 30',
            'Explorer >= 10',
            'Safari >= 8',
            'Opera >= 20',
          ]),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        data: '@import "./helpers/scss/index";',
        includePaths: [
          config.paths.base('node_modules'),
          config.paths.site('client'),
          config.paths.site('shared'),
        ],
      },
    },
  ]
}


export default [
  {
    test: /\.scss$/,
    use: loaderConfig,
  },
]
