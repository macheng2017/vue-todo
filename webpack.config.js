const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//判断是否是开发环境
const isDev = process.env.NODE_ENV ==='development';

const config = {
  entry: path.join(__dirname, "src/index.js"), //设置入口 使用path.join设置的是绝对路径  _dirname 代表是工程目录 将后面的src中的入口文件拼接起来 
  //entry: './src/index.js',
  output: {
    //设置出口
    filename: "bundle.js", //将依赖打包为输出文件
    path: path.resolve(__dirname, "dist"), //设置输入文件夹
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.(gif|jpg|jpeg|png|svg)$/,
        loader: 'url-loader',   
        options:{limit:1024,name:'[name].[ext]' // 使用webpack选项定义输出的图片名字以及后缀
    
                }
    },
    {test:/\.styl/,
      use:[
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]}
    
    ]
  },
  plugins:[
    //webpack框架必须有的配置 根据不同的环境(development & production)
    //加载不同的包,development的包过大
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:isDev ?'"development"':'"production"'
      }
    }),
    new HTMLPlugin()
  ]
};

if(isDev){
  config.devServer ={
    port:8000,
    host:'0.0.0.0',// localhost 和 ip都可以访问
    overlay:{
      errors:true //将显示错误打开
    }
  }
}
module.exports = config;