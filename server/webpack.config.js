const webpack = require("webpack");
const path = require("path");
const isProductionBuild = process.env.NODE_ENV === "production";

module.exports = {
  mode: 'development',
  entry: [
    './index.ts',
  ],
  target: 'node',
  output: {
    pathinfo: true,
    filename: 'index.js',
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".wasm"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            loader: require.resolve('ts-loader'),
            exclude: /node_modules/
          }
        ],
      },
    ],
  },
};
