const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const staticPath = path.resolve(__dirname, './web/static/')
const outputPath = path.resolve(__dirname, './priv/static/')

module.exports = {  
  entry: ['./web/static/js/app.js', './web/static/css/app.css'],
  output: {
    path: outputPath,
    filename: 'js/app.js'
  },
  module: {
    noParse: /\.elm$/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  resolve: {
    alias: {
      phoenix_html:
        __dirname + '/deps/phoenix_html/web/static/js/phoenix_html.js',
      phoenix:
        __dirname + './deps/phoenix/web/static/js/phoenix.js'
    }
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([{ from: './web/static/assets' }])
  ],
  devServer: {
    inline: true,
    stats: 'errors-only'
  }
}
