const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  // 解析模块的规则
  resolve: {
    //配置解析模块的路径别名：有点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    //配置省略文件路径的后缀名 默认['.js','.json']
    extensions: [".js", ".json", ".jsx", ".css"],
    // 告诉webpack解析模块是去找哪个目录 默认['node_modules']
    modules: [resolve(__dirname, "../../node_modules")],
  },
};
