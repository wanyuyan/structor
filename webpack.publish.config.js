var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname,'src/js/app.js'),
    vendors: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '/[name].[chunkhash:5].chunk.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
            presets: ['react', "latest", "stage-3"]
        }
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      // 可以在 js 中引用 sass 的加载器
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      // 处理图片
      {
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: 'url?limit=25000&name=images/[name].[ext]'
      },
      // 处理字体文件
      {
          test: /\.(eot|woff|ttf|woff2|svg)$/,
          loader: 'url?limit=1000000&name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.sass', 'jsx'],
  },
  externals: {
    // 'react1': 'react',
    // 'react-dom1': 'react-dom'
  },
  plugins: [
    // 使用了该插件就不适用 gulp 了
    new CleanPlugin(['dist']),
    // 分离第三方应用插件,name属性会自动指向 entry 中 vendros 属性，filename 属性中的文件会自动构建到output中的path属性下面
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendor.js'}),
    // 用webpack压缩代码，可以忽略代码中的警告
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 可以新建多个抽离样式的文件，这样就可以有多个css文件了
    new ExtractTextPlugin("app.css"),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      htmlWebpackPlugin: {
        'files': {
          'css': ['app.css'],
          'js': ['vendors.js', 'bundle.js']
        }
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // 优化第三方的包，减少代码量
    new webpack.DefinePlugin({
      //去掉react中的警告，react会自己判断
      'process.env': {
        NODE_ENV: 'production'
      }
    })
  ]
}
