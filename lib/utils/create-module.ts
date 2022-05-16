import Metalsmith from 'metalsmith';
import { green } from 'chalk';
import { resolve, relative } from 'path';
import checkExists from '../plugins/checkExists';
import handleFileContent from '../plugins/handleFileContent';
import handleFileName from '../plugins/handleFileName';

const root = resolve(process.cwd());

export default function createModule(name: string) {
  const metalsmith = Metalsmith(__dirname).frontmatter(false);

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
    .source(resolve(__dirname, '../templates', 'module'))
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
