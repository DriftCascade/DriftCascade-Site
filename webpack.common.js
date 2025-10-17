const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    cms: path.join(__dirname, "src", "js", "cms.js"),
  },

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: ""
  },

  resolve: {
    alias: {
      'node:url': path.resolve(__dirname, 'src/polyfills/url-shim.js'),
      'node:util': 'util',
      'node:buffer': 'buffer',
      'node:process': 'process/browser',
      'process/browser': 'process/browser.js',
    },
    extensions: ['.js', '.jsx', '.json', '.mjs'],
    fallback: {
      url: require.resolve('url/'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser.js'),
      path: false,
      fs: false,
      os: false,
    },
    fullySpecified: false,
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "name=/[hash].[ext]"
        }
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        options: {cacheDirectory: true}
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          }, 
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
      const mod = resource.request.replace(/^node:/, '');
      switch (mod) {
        case 'url':
          resource.request = path.resolve(__dirname, 'src/polyfills/url-shim.js');
          break;
        case 'util':
          resource.request = 'util';
          break;
        case 'buffer':
          resource.request = 'buffer';
          break;
        case 'process':
          resource.request = 'process/browser.js';
          break;
        default:
          throw new Error(`Not found: ${resource.request}`);
      }
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "./src/fonts/",
        to: "fonts/",
      }]
    }),
    new HtmlWebpackPlugin({
      filename: "admin/index.html",
      template: 'src/cms.html',
      inject: true,
    })
  ]
};
