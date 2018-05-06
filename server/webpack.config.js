const webpack = require("webpack");
const path = require("path");
const isProductionBuild = process.env.NODE_ENV === "production";

module.exports = {
  mode: 'development',
  entry: [
    './app.ts',
  ],
  target: 'node',
  output: {
    filename: 'app.js',
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".wasm", ".rs"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.rs$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              compact: true
            }
          },
          {
            loader: require.resolve('rust-native-wasm-loader'),
            options: {
              release: true,
              wasmBindgen: {
                wasm2es6js: true,
                nodejs: true
              }
            }
          }
        ]
      }
    ]
  },
};
