const Metalsmith = require('metalsmith')
// const Inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const checkExists = require('../plugins/checkExists')
const handleFileContent = require('../plugins/handleFileContent')
const handleFileName = require('../plugins/handleFileName')
const { exec } = require('child_process')

const root = path.resolve(process.cwd())

module.exports = function createProject(name, type) {
    const metalsmith = Metalsmith(__dirname, '../templates', 'project').frontmatter(false);

    let metadata = metalsmith.metadata();
    Object.assign(metadata, {
        createType: 'project',
        name,
        projectName: name,
        projectType: type
    });

    metalsmith
        .use(checkExists())
        // .use(ask(type))
        .use(handleFileContent())
        .use(handleFileName())
        .clean(false)
        .source(path.resolve(__dirname, '../templates', 'project', type))
        .destination(root)
        .build((err, files) => {
            if (err) throw err;
            console.log(
                chalk.green('[success] 创建成功！'),
            )
            console.log(`\nDone. Now run:\n`)
            console.log(`  cd ${path.relative(root, name)}`)
            console.log(`  npm install`)
            console.log(`  npm run dev`)
        })
}

// 废弃ask插件原因：metalsmith.source是同步执行的、也就是说取不到异步执行的ask设置的projectType
// function ask(type) {
//     return function(files, metalsmith, done) {
//         if (!type) {
//             let metadata = metalsmith.metadata();
//             Inquirer.prompt({
//                 type: 'list',
//                 message: '请选择应用类型',
//                 name: 'type',
//                 choices: ['SPA', 'MPA']
//             }).then(answers => {
//                 metadata.projectType = answers.type
//                 done()
//             }) 
//         } else {
//             done()
//         }
//     }
// }