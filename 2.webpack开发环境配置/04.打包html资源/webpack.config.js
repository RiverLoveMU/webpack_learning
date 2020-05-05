/**
 * loader: 1. 下载 2.使用（配置loader）
 * plugin: 1. 下载 2.引入 3.使用
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [],
  },
  plugins: [
    //html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（js/css）
    // 需求：需要有解构的html文件
    new HtmlWebpackPlugin({
      //复制 ./src/index.html 文件, 并自动引入打包输出的所有资源（js/css）
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
