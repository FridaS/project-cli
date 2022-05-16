module.exports = function handleFileName() {
  return function(files, metalsmith, done) {
    const { name } = metalsmith.metadata();
    Object.keys(files).forEach(filename => {
      let newFilename = filename;
      if (/[_.]_projectName__/.test(filename)) {
        newFilename = newFilename.replace(/[_.]_projectName__/, name);
      }
      if (/[_.]_moduleName__/.test(filename)) {
        newFilename = newFilename.replace(/[_.]_moduleName__/, name);
      }
      if (newFilename !== filename) {
        files[newFilename] = files[filename];
        delete files[filename];
      }
    });
    done();
  };
};
