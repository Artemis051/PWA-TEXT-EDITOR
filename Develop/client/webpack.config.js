const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'App Name',
        short_name: 'App',
        description: 'Your application description',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
          },
        ],
      }),
    ],
    module: {
      rules: [
        // TODO: Add CSS loaders and babel to webpack.
        {
          test: /\.css$/, // This regex identifies CSS files
          use: ['style-loader', 'css-loader'] // Use these loaders for CSS files
        },

        // Rules for JavaScript files
        {
          test: /\.m?js$/, // This regex identifies JavaScript files
          exclude: /(node_modules|bower_components)/, // Exclude these directories
          use: {
            loader: 'babel-loader', // Use babel-loader
            options: {
              presets: ['@babel/preset-env'] // Use preset-env for babel
            }
          } 
        }
      ],
    },
  };
};
