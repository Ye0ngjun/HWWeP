const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
