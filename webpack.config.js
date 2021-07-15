const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  plugins: [new ShebangPlugin()],
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
};
