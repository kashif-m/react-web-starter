
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const CSSPlugin = new MiniCSSExtractPlugin({
  filename: 'style.[contenthash].css'
})

const HTMLPlugin = new HTMLWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.js(x)?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /.s*[ac]ss$/,
        use: ['style-loader', MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /.(ttf|otf|svg)/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [CSSPlugin, HTMLPlugin],
  devServer: {
    proxy: [{
      context: ['/*'],
      target: 'http://localhost:5000'
    }],
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
}