// export const development = resolveRule({
//   name: 'audio/[name].[ext]',
// })
//
// export const production = resolveRule({
//   name: '[name].[ext]',
//   outputPath: 'audio/',
//   publicPath: '/assets/audio/',
// })

export default [
  {
    test: /(wav|mp3)$/,
    use: [
      'file-loader',
    ],
  },
]
