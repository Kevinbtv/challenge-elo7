const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = (env, argv) => {
  const mode = argv.mode;
  return {
    mode: mode,
    devtool: mode === "development" ? "source-map" : false,
    entry: {
      main: path.resolve(__dirname, "./app.js")
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "js/main.[contenthash].js",
      clean: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"), //
        filename: "index.html" //
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/img"),
            to: path.resolve(__dirname, "dist/img")
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: mode === "development" ? true : false,
                importLoaders: 1
              }
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset"
        }
      ]
    }
  };
};

module.exports = config;
