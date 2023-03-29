const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const path = require("path");

const pkg = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new FederatedTypesPlugin({
      disableDownloadingRemoteTypes: true,
      federationConfig: {
        name: "host",
        filename: "remoteEntry.js",
        exposes: {
          "./store": "./src/store",
        },
        remotes: {
          host: "host@http://localhost:3001/remoteEntry.js", //Allow to share the same context instance (https://www.youtube.com/watch?v=njXeMeAu4Sg&t=640s)
          remote: "remote@http://localhost:3002/remoteEntry.js",
        },
        shared: {
          ...pkg.dependencies,
          react: {
            singleton: true,
            requiredVersion: pkg.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: pkg.dependencies["react-dom"],
          },
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
