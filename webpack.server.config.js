const path = require('path')
const outputPath = path.resolve(__dirname, './priv/server')

module.exports = {  
  entry: "./web/static/js/server_app.js",
  output: {
    path: outputPath,
    filename: 'js/main.js',
    libraryTarget: 'commonjs2'
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
    ]
  },
  resolve: {
    alias: {
      phoenix_html:
        __dirname + '/deps/phoenix_html/web/static/js/phoenix_html.js',
      phoenix:
        __dirname + './deps/phoenix/web/static/js/phoenix.js'
    }
  }
}
