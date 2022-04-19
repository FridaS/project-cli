const chalk = require('chalk');
const async = require('async');
const render = require('consolidate').handlebars.render;

module.exports = function handleFileContent() {
  return function (files, metalsmith, done) {
    const keys = Object.keys(files);
    async.each(keys, (file, next) => {
      const str = files[file].contents.toString();

      // 匹配到至少3个嵌套大括号（如“{{{sth}}}”）才进行匹配替换处理
      if (!/{{{([^{}]+)}}}/g.test(str)) {
        return next();
      }

      // 匹配替换
      render(str, metalsmith.metadata(), (err, res) => {
        if (err) {
          console.log(
            chalk.red('[error]', err.message),
          );
          return next(err);
        }
        const BufferFrom = Buffer.from;
        files[file].contents = new BufferFrom(res);
        next();
      });
    }, done);
  };
};
