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


//如果是development 则加载这些选项
if(isDev){
  config.devtool ='#cheap-module-eval-source-map'; //es6代码经过编译的在浏览器不能看,使用source-map进行代码映射
  config.devServer ={
    port:8000,
    host:'0.0.0.0',// localhost 和 ip都可以访问
    overlay:{
      errors:true //将显示错误打开
    },
    //historyFallback:{}//我们做的是SPA 很多都是前端的地址,经过vue-router,
    //把一些后端无法解析的url请求定向到指定地址,例如index.html
    //open:true // 修改完成之后自动打开一个浏览器
    hot:true //局部刷新,不影响页面的其他部分数据
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),  //The plugin that hot module feature 
    new webpack.NoEmitOnErrorsPlugin()
  )
}
module.exports = config;
