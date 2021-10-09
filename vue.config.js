module.exports = {
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8000,
        disableHostCheck: true,
        proxy: {
            '/cyj': {
                target: 'http://yapi.demo.qunar.com/mock/1186/',
                ws: true,  // proxy websockets
                changeOrigin: true,
                pathRewrite: {
                   '^/cyj': ''
                }
            },

          '': {//拦截名
            target: 'http://dev.home.rulaifozu.xiuzhenyuan.cn',
            ws: true,  // proxy websockets
            changeOrigin: true,
            pathRewrite: {
              '': ''  //拦截名
            }
          },
         
        }
    },


};
