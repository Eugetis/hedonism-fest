const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "about.html"),
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "for-participants.html"),
      filename: 'for-participants.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "catalog.html"),
      filename: 'catalog.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "thanks-for-application.html"),
      filename: 'thanks-for-application.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "thanks-for-support.html"),
      filename: 'thanks-for-support.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "404.html"),
      filename: '404.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "ui-kit.html"),
      filename: 'ui-kit.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "pages", "footer.html"),
      filename: 'footer.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ]
}


