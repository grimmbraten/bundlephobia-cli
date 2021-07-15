const path = require("path");
const ShebangPlugin = require("webpack-shebang-plugin");

module.exports = {
  entry: "./index.js",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  plugins: [new ShebangPlugin()]
};
