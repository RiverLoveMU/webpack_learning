/**
 * loader: 1. 下载 2.使用（配置loader）
 * plugin: 1. 下载 2.引入 3.使用
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  externals: {
    //忽略库名 -- npm包名 忽略jquery
    jquery: "jQuery",
  },
};
