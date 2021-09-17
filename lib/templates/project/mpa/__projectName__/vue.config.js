const path = require('path')
const fs = require('fs')
const mockMiddleware = require('nei-mock');

const MODULES_PATH = path.resolve(__dirname, 'src/modules')
const entries = fs.readdirSync(MODULES_PATH);

const entriesFiles = entries.filter(entry => {
    const type = fs.statSync(path.join(MODULES_PATH, entry)) 
    return type.isDirectory();
})

let pages = {
    index: {
        entry: 'src/main.js',
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
}

const alias = {
    '@': path.join(__dirname, 'src'),
    '@common': path.join(__dirname, 'src/common'),
    '@components': path.join(__dirname, 'src/components'),
}

entriesFiles.forEach(dirName => {
    pages[dirName] = {
        entry: `src/modules/${dirName}/main.js`,
        filename: `${dirName}.html`,
        chunks: ['chunk-vendors', 'chunk-common', `${dirName}`]
    }
    alias[`@${dirName}`] = path.join(__dirname, `src//modules/${dirName}`)
})

/**
 * 1. npm run dev 找不到favicon.ico【npm run build 为./favicon.ico，可以成功找到】
 * 2. 打包优化
 */
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    pages,
    configureWebpack: {
        resolve: {
            alias,
        }
    },
    devServer: {
        before(app) {
            console.log('\n----------nei mock start----------')
            mockMiddleware(app)
        },
    }
}