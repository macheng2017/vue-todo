const autoprefixer = require('autoprefixer')
//autoprefixer 是后处理css 通过 autoprefixer插件处理需要加浏览器前缀的css属性,让其自动处理
module.exports={
    plugins:[
        autoprefixer()
    ]
}