const path = require('path')
const mockMiddleware = require('nei-mock');

const alias = {
    '@': path.join(__dirname, 'src'),
    '@pages': path.join(__dirname, 'src/pages'),
    '@components': path.join(__dirname, 'src/components'),
}

module.exports = {
    publicPath: './',
    outputDir: 'dist',
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