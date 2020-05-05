const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

//定义nodejs环境变量，定义使用browserslist中哪个文件
process.env.NODE_ENV = "production";

/*
  PWA：渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
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
            use: [
              /*
              开启多进程打包
              进程启动时间大概600ms，进程通信也有花销。
              只有工作消耗时间比较长，才需要多进程打包
              */
              {
                loader: "thread-loader",
                options: {
                  workers: 2, // 进场2个
                },
              },
              {
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
            ],
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
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助servicewoker快速启动
        2. 删除旧的servicewoker

        生成一个servicewoker 配置文件
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: "production",
  devtool: "source-map",
};
