'use strict';
let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry:{
    'main': './app/main.ts',
  },
  watch:true,
  module:{
    rules:[{
      test:/\.tsx?$/,
      loader:'ts-loader',
      exclude:'/node_module/'
    }]
  },
  output:{
    filename:'[name].js',
    path: path.join(__dirname , 'static/scripts-build')
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins:[
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // })
  ]
};