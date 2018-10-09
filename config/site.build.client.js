module.exports = {
  env: 'production',
  webpack: 'build.client',

  // publicPath: `https://react-firebase-chat-11658.firebaseio.com/${baseConfig.publicPath}`,

  services: {
    base: 'https://react-firebase-chat-11658.firebaseio.com/',
    api: 'https://react-firebase-chat-11658.firebaseio.com/',
  },

  modules: [
    '',
    'site',
    'site/client',
    'site/client/local_modules',
    'node_modules',
  ],
}
