const Metalsmith = require('metalsmith');
const chalk = require('chalk');
const path = require('path');
const checkExists = require('../plugins/checkExists');
const handleFileContent = require('../plugins/handleFileContent');
const handleFileName = require('../plugins/handleFileName');

const root = path.resolve(process.cwd());

module.exports = function createModule(name) {
  const metalsmith = Metalsmith(__dirname, '../templates', 'module').frontmatter(false);

  const metadata = metalsmith.metadata();
  Object.assign(metadata, {
    createType: 'module',
    name,
    moduleName: name,
  });

  metalsmith
    .use(checkExists())
    .use(handleFileContent())
    .use(handleFileName())
    .clean(false)
    .source(path.resolve(__dirname, '../templates', 'module'))
    .destination(root)
    .build((err) => {
      if (err) {
        throw err;
      }
      console.log(
        chalk.green('[success] 创建成功！'),
      );
      console.log('\nDone. Now run:\n');
      console.log(`  cd ${path.relative(root, name)}`);
      console.log('  npm install');
      console.log('  npm run dev');
    });
};
