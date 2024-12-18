const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  ],
};
