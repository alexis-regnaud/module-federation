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
    port: 3002,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: 'http://localhost:3002/',
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
      name: "module2",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './Module': './src/remote-entry.ts',
        './ExternalComponent': './src/app/external-component.tsx',
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
