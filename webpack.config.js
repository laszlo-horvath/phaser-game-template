const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'src/phaser.js')

module.exports = {
  devtool: isProduction ? 'none' : 'inline-source-map',

  entry: {
    main: [
      './src/game.ts',
    ],
    vendor: ['phaser']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      phaser: phaser
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      }
    ]
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      WEBGL_RENDERER: true,
      CANVAS_RENDERER: true
    }),

    new HtmlWebpackPlugin({
      title: 'TS Template App',
      template: './src/index.ejs',
      chunks: ['vendor', 'main']
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' }
      ],
    })
  ]
}
