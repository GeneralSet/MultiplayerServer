const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProductionBuild = process.env.NODE_ENV === "production";
// const nodeEnv = isProductionBuild ? "production" : "development";

module.exports = {
  entry: [
    './src/index',
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: [
      'node_modules',
      './src'
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".wasm"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          // Compile .tsx?
          {
            test: /\.tsx?$/,
            loader: require.resolve('ts-loader'),
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
          }
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
  },

  // plugins: [
  //   // Generates an `index.html` file with the <script> injected.
  //   new HtmlWebpackPlugin(),
  //   // Perform type checking and linting in a separate process to speed up compilation
  //   new ForkTsCheckerWebpackPlugin(),
  // ],
  node: {
    fs: 'empty'
  },
};
