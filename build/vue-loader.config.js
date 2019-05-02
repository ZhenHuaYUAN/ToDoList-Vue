// vue-loader的相关配置
// const docsLoader = require.resolve("./doc-loader")
module.exports = (isDev) =>{
  return{
    // 该值指示是否在元素内容中保留空白区域。阻止元素间生成空白内容
    preserveWhitespace:true,
    // 把所有css都单独提取到一个css文件里
    extractCSS: !isDev,
    cssModules:{},
    // hotReload: false 根据环境变量生成
    // 把docs里的内容输出到组件的option 上 。指定了loader后相应的模块就会用loader加载
    loaders:{
      'docs':docsLoader,
    }
  }
}