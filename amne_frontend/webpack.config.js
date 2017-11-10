var path = require('path')
var InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  plugins: [
    new InlineEnvironmentVariablesPlugin({ NODE_ENV: 'production' }, { warnings: false })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};