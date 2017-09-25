const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = (env) => ({
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: env.outDir
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?/, loader: 'awesome-typescript-loader' +
        '?configFileName=' + env.tsconfig },
      { test: /\.js/,   loader: 'source-map-loader', enforce: 'pre'}
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
})
