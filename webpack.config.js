const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /~ac~\.(png|jpeg)$/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/average-color-loader.js'),
          }
        ]
      },
    ]
  },
  mode: 'development',
};