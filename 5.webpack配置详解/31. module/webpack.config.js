const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      //loader配置
      {
        test: /\.css$/,
        //多个loader用use
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        //排除node_modules下的文件
        exclude: /node_modules/,
        //只检查src下的文件
        include: resolve(__dirname, "src"),
        // 有限执行 'pre'   延后执行 'post'
        enforce: "pre",
        //单个loader 用loader
        loader: "eslint-loader",
        //配置
        options: {},
      },
      {
        //一下配置只会生效一个
        oneOf: [],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
