const px2rem = require('postcss-px2rem');
const postcss = px2rem({
  remUnit: 75
});
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
// cdn预加载使用
console.log('process.env.NODE_ENV is: ' + process.env.NODE_ENV)

module.exports = {
  //设置打包后为相对路径
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      return args
    })
    
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
      .loader('style-vw-loader')

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */

    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      // image-webpack-loader 图片压缩
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  // 配置反向代理
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://192.168.43.29:8080/',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  //   // 开启https 访问时使用https://172.31.120.61:8081 
  //   // https://localhost:8081 也可以访问，不过自带info请求会报错 不清楚具体原因
  //   https: true
  // },
  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: config => {
    const myConfig = {}
    // if (process.env.NODE_ENV === 'production') {
    //     // 1. 生产环境npm包转CDN
    //     myConfig.externals = externals
    // }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }

    return myConfig
  }

}
