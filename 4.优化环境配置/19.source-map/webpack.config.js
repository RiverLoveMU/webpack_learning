const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath: "imgs",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        exclude: /\.(css|less|html|png|jpg|gif|js)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3001,
    open: true,
    hot: true,
  },
  devtool: "source-map",
};
/*
  source-map: 一种提供源代码到构建后代码映射的技术 （如果构建后代码出错了，通过映射关系追踪到源代码错误）
  [inline- | hidden-| eval-] [nosources-] [cheap-[module-]] source-map

  source-map:外部
    错误代码准确信息和源代码的错误位置
  inline-source-map:内联
    1. 只生成一个内联source-map
    错误代码准确信息和源代码的错误位置
  hidden-source-map:外部
    错误代码准确信息但是没有错误位置，不能追踪到源代码错误，只能提示到构建后代码错误
  eval-source-map:内联
    1. 每一个文件都生成对应的source-map，都在eval
    错误代码准确信息和源代码的错误位置
  nosources-source-map:外部
    错误代码准确信息但是没有任何源代码信息
  cheap-source-map:外部
    错误代码准确信息和源代码的错误位置 但是只能精确到行
  cheap-module-source-map:外部
     错误代码准确信息和源代码的错误位置
     module会将loader的source-map加入

  内联和外部区别：1、外部要生成文件 2、内联更快

  开发环境：速度快，调试更友好
    速度（eval>inline>cheap....）
    eval-cheap-source-map >  eval-source-map
    调试更友好
    source-map
    cheap-module-source-map
    cheap-source-map

    --eval-source-map 最优（综合速度调试友好）
    eva-cheap-module-source-map （速度更快调试不够友好）

  生产环境：源代码要不要隐藏，调试要不要更友好
    //内联会让代码体积变大，所以在生产环境不考虑内联
    nosources-source-map 全部隐藏
    hidden-source-map 只隐藏源代码，不隐藏构建后代码

    --> source-map / cheap-module-source-map

*/
