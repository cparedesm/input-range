const common = require("./webpack.common");
const { merge } = require("webpack-merge");

const devConfig = {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  devtool: "eval-source-map",
}

module.exports = merge(common, devConfig);