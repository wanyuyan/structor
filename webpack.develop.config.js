var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',         // 实现浏览器自动刷新
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname,'src/js/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    fileName: 'bundle.js',
    chunkFilename: '/[name].[chunkhash:5].chunk.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,   // 处理字体
        loaders: ['url?limit=25000']           // 25k
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loaders: ['url?limit=25000']            // webpack 会将小于指点大小的文件转化成 base64 格式的 dataUrl, 其他图片会做适当的压缩并存放在指定目录中
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "src/style"),
      path.resolve(__dirname, "src/aui-components/tyle")
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      ui: 'src/aui-components/js',
      uiStyle: 'src/aui-components/style',
      js: 'src/js',
      container: 'src/js/containers',
      component: 'src/js/components',
      style: 'src/style',
      image: 'src/public/images'
    },
    extensions: ['', '.js', '.json', '.scss', 'jsx']
  },
  // 配置了这个属性之后 react 和 react-dom 这些第三方的包都不会被构建进 js 中，那么我们就需要通过 cdn 进行文件的引用了
  // 前边的这个名称是在项目中引用用的，相当于 import React from 'react1' 中的 react
  externals: {
    // 'react1': 'react',
    // 'react-dom1': 'react-dom',
  },
  devServer: {
    historyApiFallback: true,
  }
};
