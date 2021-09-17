const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const root = path.resolve(process.cwd())
const typeMap = {
    project: '工程',
    module: '模块'
}

module.exports = function checkExists() {
    return function(files, metalsmith, done) {
        let { name, createType } = metalsmith.metadata();
        const dest = path.resolve(root, name)

        if (fs.existsSync(dest)) {
            console.log(
                chalk.red(`[error] ${root} 已存在名为 ${name} 的${typeMap[createType]}`)
            )
            process.exit(1)
        }

        done();
    }
}