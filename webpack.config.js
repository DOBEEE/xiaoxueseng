var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: {
    main: path.join(__dirname, 'react_app','main.js')
  },
  output: {
    path: path.join(__dirname, "build/static"),
    filename: "[name].min.js"
  },  

  module: { // 在配置文件里添加JSON loader
      rules: [
          {
              test: /\.json$/,
              use: [
                {loader: 'json-loader'}
              ]
          },
          {
              test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
              loader: 'url-loader?limit=50000&name=[path][name].[ext]'
          },
          {
              test: /\.css$/,
              use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
              ]
          },
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015','react']
                  }
                },
              ]
          }
      ]
  },
  devServer: {
      hot: true,
      contentBase: path.join(__dirname, 'build/static'),//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
      proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            },
            '/static': {
                target: 'http://localhost:3000',
                secure: false,
                changeOrigin: true
            }
      }
  },
  
  plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + "/react_app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
      }),
      
      // new webpack.BannerPlugin("Copyright Flying Unicorns inc."),
      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      // new webpack.optimize.DedupePlugin()
      new webpack.HotModuleReplacementPlugin(),//热加载，必须
      new webpack.NamedModulesPlugin(),
      // new webpack.LoaderOptionsPlugin({
         
      // }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      })
  ],
  performance: {
      hints: false
  }
  
}