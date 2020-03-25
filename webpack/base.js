const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: './game/index.js'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /server/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|json)$/i, //sluzi za import img,gif,png
        use: 'file-loader'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, './game'),
    }),
      new CopyWebpackPlugin([
        {from: './game/assets', to: 'assets'}
      ])
  ],
};