const path = require("path");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: "web",
  entry: {
    bundle: "./src/client/index.js"
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build/public")
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(?:css|scss)$/,
        use: [
          ExtractCssChunks.loader,
          { 
            loader: "css-loader",
            options:{
              context: path.resolve(__dirname, 'context')
            }
          },
          { 
            loader: "sass-loader",
            options:{
              sourceMapEmbed: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new ExtractCssChunks(
      {
        filename: "[name].css",
      }
    ),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
    }),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
  ]
}
