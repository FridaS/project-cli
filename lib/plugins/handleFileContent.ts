import { red } from 'chalk';
import { each } from 'async';
import { handlebars } from 'consolidate';
import Metalsmith, { Callback, Files } from 'metalsmith';

const render = handlebars.render;

export default function handleFileContent() {
  return function (files: Files, metalsmith: Metalsmith, done: Callback) {
    const keys = Object.keys(files);
    each(
      keys,
      (file, next) => {
        const str = files[file].contents.toString();

        // 匹配到至少3个嵌套大括号（如“{{{sth}}}”）才进行匹配替换处理
        if (!/{{{([^{}]+)}}}/g.test(str)) {
          return next();
        }

        // 匹配替换
        render(str, metalsmith.metadata(), (err, res) => {
          if (err) {
            console.log(
              red('[error]', err.message),
            );
            return next(err);
          }
          files[file].contents = Buffer.from(res);
          next();
        });
      },
      () => done(null, files, metalsmith),
    );
  };
}
