module.exports = {
  env: 'development',
  webpack: 'site.dev',

  publicPath: `http://localhost:4000/`,

  services: {
    base: 'http://localhost:4000/',
    api: 'http://localhost:4000/',
  },

  modules: [
    '',
    'site',
    'site/client',
    'site/client/local_modules',
    'node_modules',
  ],
}
