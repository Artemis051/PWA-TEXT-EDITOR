const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { url } = require('inspector');

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
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints:false, inject:true,
        name: 'Just another Text Editor',
        short_name: 'Jate',
        description: 'test-editor',
        background_color: '#ffffff',
        theme_color:'#225ca3',
        start_url:"/",publicPath:"/",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join("assets", "icons")
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
