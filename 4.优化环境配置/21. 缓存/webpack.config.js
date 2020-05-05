const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

//定义nodejs环境变量，定义使用browserslist中哪个文件
process.env.NODE_ENV = "production";

/*
  缓存：
    babel缓存
    cacheDirectory: true,
    ==》第二次打包速度更快
    文件资源缓存
    hash：每次webpack构建会生成一个唯一的hash值。
    问题：因为js和css使用同一个hash值
      如果重新打包，会导致所有缓存失效。（可能只改动一个文件）
    chunkhash：根据chunk生成hash值，如果打包来源同一个chunk，hash值就一样
    问题：js和css hash值还是一样的
      因为css是在js中被引入的，属于同一个chunk
    contenthash：根据文件内容生成hash值。不同文件hash值一定不一样 
    ==》让代码上线运行缓存更好使用 
 */

//复用
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    //还需要在package.json中定义browserslist
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => {
        require("postcss-preset-env")();
      },
    },
  },
];

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/build.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        //在package.json中配置eslintConfig
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        //一下loader只会匹配一个
        //注意，不能有两项配置处理同一个类型的文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
          },
          /*
            正常来讲，一个文件只能被一个loader处理
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
            限制性eslint，再执行babel-loader
          */
          {
            //在package.json中配置eslintConfig
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: 3 },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17",
                    },
                  },
                ],
              ],
              // 开启babel缓存
              // 开启构建时，会读取之前的缓存
              cacheDirectory: true,
            },
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]",
              outputPath: "imgs",
              esModule: false,
            },
          },
          {
            test: /\.html$/,
            loader: "html-loader",
          },
          {
            exclude: /\.(js|css|less|jpg|png|gif|html)$/,
            loader: "file-loader",
            options: {
              outputPath: "media",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/build.[contenthash:10].css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "production",
  devtool: "source-map",
};
