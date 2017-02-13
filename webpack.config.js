var path = require('path')

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron',
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  'resolve': {
    'alias': {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  devtool: 'eval-source-map',
}
