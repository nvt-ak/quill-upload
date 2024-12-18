const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    workboard: "./src/index.js",
  },
  output: {
    filename: "index.[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      process: require.resolve("process/browser"), // Add this line
    },
    alias: {
      "quill-upload": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: false,
    port: 3000,
    hot: false,
    client: {
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 3000,
      },
    },
    webSocketServer: "ws",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
