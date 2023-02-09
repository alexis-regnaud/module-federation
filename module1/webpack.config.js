const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/main.ts",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: 'http://localhost:3001/',
    chunkFilename: "[id].[contenthash].js",
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Typescript loader
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "module1",
      filename: "remoteEntry.js",
      remotes: {
        module2: "module2@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        './Module': './src/remote-entry.ts',
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
