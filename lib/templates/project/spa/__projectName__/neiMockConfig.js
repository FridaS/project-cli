module.exports = {
    /**
     * nei项目的唯一标识
     * 写法1，唯一的nei项目
     *  key: {String} 
     * 写法2，多个nei项目，后续可选择使用哪个项目
     *  key: {
     *      'projet1': {String},
     *      'project2': {String} 
     *  }
     */
    key: '9d5bb04a023b4f8b0a8d24c405164137',
    domain: 'http://10.101.96.26:8083', // 数据源服务器，默认https://nei.netease.com
    // 代理到proxyTarget的接口
    proxyURL: ['/api'],
    proxyTarget: {
        'test-84': 'http://10.5.24.128:84',
        'debug-88': 'http://10.5.24.128:88',
        'dev-82': 'http://10.5.24.128:82',
        'online-86': 'http://10.5.24.128:86'
    },
    // 本地mock数据存放目录
    localMockData: 'mock'
}