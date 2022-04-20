import Metalsmith from 'metalsmith';
// const Inquirer = require('inquirer')
import { green } from 'chalk';
import { resolve, relative } from 'path';
import checkExists from '../plugins/checkExists';
import handleFileContent from '../plugins/handleFileContent';
import handleFileName from '../plugins/handleFileName';

const root = resolve(process.cwd());

export default function createProject(name: string, type: string) {
  const metalsmith = Metalsmith(__dirname).frontmatter(false);

  const metadata = metalsmith.metadata();
  Object.assign(metadata, {
    createType: 'project',
    name,
    projectName: name,
    projectType: type,
  });

  metalsmith
    .use(checkExists())
  // .use(ask(type))
    .use(handleFileContent())
    .use(handleFileName())
    .clean(false)
    .source(resolve(__dirname, '../templates', 'project', type))
    .destination(root)
    .build((err) => {
      if (err) throw err;
      console.log(
        green('[success] 创建成功！'),
      );
      console.log('\nDone. Now run:\n');
      console.log(`  cd ${relative(root, name)}`);
      console.log('  npm install');
      console.log('  npm run dev');
    });
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
