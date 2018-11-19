/*
 * Modules
*/
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
const async = require('async');
const File = require('./File');
const utils = require('./utils');

let test = true;
const verbose = false;

dot.templateSettings.strip = false;
dot.log = verbose;

const defaultOpts = {
  verbose: false
};

/*
 * Templates
*/
class Template {
  constructor(src, packages, opts = defaultOpts) {
    this.src = src;
    this.templates = {};
    this.packages = Array.isArray(packages) ? packages : [packages];
    this.opts = opts;

    // new feature
    this._defs = {};

    this.packages.forEach(_package => {
      this.templates[_package] = this._retrievePackage(_package);
    });
  }

  /*
   * Render 
   *  
   * This function will render all compiled packages that were passed into template instance at creation.
   * 
   * @arg dest {string} Path to where the compiled files save at
   * @arg data {object} This will be passed into doT for env variables in template files
   * @arg cb {function} Function to be called when all files and directories have been rendered. 
  */
  render(dest, data = {}, cb) {
    const self = this;

    self.log('rendering has began on', dest);

    fs.ensureDir(dest)
      .then(function() {
        async.each(
          self.packages,
          function(packageName, done) {
            const template = self.templates[packageName];

            // make all directories for this package
            utils
              .ensureDirectories(dest, template.directories)
              .then(function() {
                return self._renderTemplateFiles(dest, data, template.files);
              })
              .then(done)
              .catch(function(err) {
                console.log('error in render: ', err);
                done();
              });
          },
          function() {
            self.log('done processing ', dest);
            cb();
          }
        );
      })
      .catch(err =>
        console.log(
          'Internal error: please report this error as a github issue',
          err
        )
      );
  }

  _renderTemplateFiles(destPath, data, files) {
    const self = this;
    return new Promise(function(resolve, reject) {
      async.each(
        files,
        function(file, done) {
          const packagesToObject = self.packages.reduce(function(acc, next) {
            acc[next] = true;
            return acc;
          }, {});

          data = Object.assign(data, { packages: packagesToObject });

          const pathToComponent = path.join(
            destPath,
            file.path,
            file.fileName(data)
          );

          fs.outputFile(pathToComponent, file.compiler(data), done);
        },
        function(err, results) {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  _retrievePackage(_package) {
    const PACKAGE_PATH = path.join(this.src, _package);
    const self = this;

    var template = {
      directories: [],
      files: []
    };

    this.log('compiling package', _package);

    transverseFileTree(PACKAGE_PATH, function(fileName, relPath, isDir) {
      // full path to file relative to src path
      const fullPath = path.join(relPath, fileName);

      if (isDir) {
        template.directories.push(fullPath);
      } else {
        /*is file*/
        const srcDir = path.join(PACKAGE_PATH, relPath);
        const file = new File(srcDir, relPath, fileName);

        template.files.push(file);
      }
    });

    return template;
  }

  log() {
    return this.opts.verbose && console.log.apply(console, arguments);
  }
}

/*
 * Helper functions
 * Move all to utils
*/

// call the cb on every files or dir in the src path
function transverseFileTree(src, cb) {
  const compilePackageDirectory = function(srcPath, relativePathFromSrc = '') {
    try {
      var directoryContents = fs.readdirSync(srcPath);
    } catch (e) {
      console.log(e);
      return;
    }

    // Filter out non directory names from list
    // Compile all directories
    directoryContents.forEach(function(fileName) {
      // fileName could be a file or directory
      const filePath = path.join(srcPath, fileName);

      const isDir = utils.isDir(filePath);

      // path to file/dir, file name, relative path will only hold the path its on from
      cb(fileName, relativePathFromSrc, isDir);

      if (isDir) {
        const relativePath = path.join(relativePathFromSrc, fileName);
        compilePackageDirectory(filePath, relativePath);
      }
    });
  };

  compilePackageDirectory(src);
}

/*
 * trys
*/

const tempPath = path.join(__dirname, '../templates/');
const t = new Template(tempPath, 'main');

// console.log(t.templates.main.files);

t.render(path.join(__dirname, '../dest'), { name: 'lino' }, function() {
  console.log('done');
});

// const compilePackageDirectory = function(srcPath, destPath) {
//   destPath = destPath || '';

//   try {
//     var directoryContents = fs.readdirSync(srcPath);
//   } catch (e) {
//     console.log(e);
//     return;
//   }

//   // Filter out non directory names from list
//   // Compile all directories
//   directoryContents.forEach(function(directoryName) {
//     const directoryPath = path.join(srcPath, directoryName);
//     const newDestPath = path.join(destPath, directoryName);

//     if (!utils.isDir(directoryPath)) {
//       // files.push(directoryName);
//       const file = new File(srcPath, destPath, directoryName);
//       template.files.push(file);
//     } else {
//       template.directories.push(newDestPath);
//       compilePackageDirectory(directoryPath, newDestPath);
//     }
//   });
// };

// compilePackageDirectory(PACKAGE_PATH);
