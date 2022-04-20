import { red } from 'chalk';
import { existsSync } from 'fs';
import Metalsmith, { Callback, Files } from 'metalsmith';
import { resolve } from 'path';

const root = resolve(process.cwd());
const typeMap = {
  project: '工程',
  module: '模块',
};

type CustomMetadata = () => { name: string; createType: 'project' | 'module'; };

export default function checkExists() {
  return function(files: Files, metalsmith: Metalsmith, done: Callback) {
    const { name, createType } = (metalsmith.metadata as CustomMetadata)();
    const dest = resolve(root, name);

    if (existsSync(dest)) {
      console.log(
        red(`[error] ${root} 已存在名为 ${name} 的${typeMap[createType]}`),
      );
      process.exit(1);
    }

    done(null, files, metalsmith);
  };
}
