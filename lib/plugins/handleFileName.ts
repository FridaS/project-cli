import Metalsmith, { Callback, Files } from 'metalsmith';

type CustomMetadata = () => { name: string; createType: 'project' | 'module'; };

export default function handleFileName() {
  return function(files: Files, metalsmith: Metalsmith, done: Callback) {
    const { name } = (metalsmith.metadata as CustomMetadata)();
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
    done(null, files, metalsmith);
  };
}
