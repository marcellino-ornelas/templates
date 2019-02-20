const dot = require('dot');
const path = require('path');
const fs = require('fs');
const is = require('is');
const utils = require('./utils');
const { DirNode } = require('./FileTree');
const File = require('./File');

let test = true;
const verbose = true;

dot.templateSettings.strip = false;
dot.log = verbose;

const defaultOpts = {
  verbose: false
};

const mkDir = utils.promisify(fs.mkdir, fs);

/**
 * Templates
 */
class Templates {
  constructor() {
    this.opts = {
      verbose: false
    };
    this.packages = {};
    this.packagesUsed = [];
    this.compiledFiles = [];
  }

  /**
   * Specifiy what template folder to use for rendering
   * @param  {String}        templateLocation - location to templating folder or url to github
   * @param  {Array<String>} packages         - list of packages to include
   * @return {undefined}
   */
  use(templateLocation, packages) {
    if (!templateLocation || !is.string(templateLocation)) {
      throw new Error(
        'Use takes one string argument. The string can be a url to a github repo or a path to local file'
      );
    }

    const isLocationAbsolute = path.isAbsolute(templateLocation);

    switch (true) {
      // case !isLocationAbsolute && /\//g.test(templateLocation):
      //   console.log('github coming soon');
      //   break;

      // case !/\W/gi.test(templateLocation):
      //   const cachedPackageLocation = path.join(
      //     CACHE_LOCATION,
      //     templateLocation
      //   );

      //   if (!utils.isDir(cachedPackageLocation)) {
      //     throw new Error(
      //       'No cached template found. Please use a valid template name'
      //     );
      //   }

      //   this.src = path.join(cachedPackageLocation, '.tps');
      //   break;

      default:
        const src = isLocationAbsolute ? templateLocation : process.cwd();
        this.src = path.join(src, '.tps');
        break;
    }

    // TODO
    // load settings && load default packages

    // load packages
    packages && this.loadPackages(packages);
  }

  /**
   * Include packages to use in the render process
   * @param  {} packages
   */
  loadPackages(packages) {
    if (!Array.isArray(packages)) {
      if (is.string(packages) && packages) {
        packages = [packages];
      } else {
        throw new TypeError('Argument must be a string or an array of stings');
      }
    }

    if (!this.src) {
      throw new Error('Must specfiy a template folder to use');
    }

    packages.forEach(_package => this.loadPackage(_package));
  }

  /**
   * @param {} _package
   */
  loadPackage(_package) {
    if (!is.string(_package)) {
      throw new TypeError('Argument must be a string');
    }

    if (this.packages.hasOwnProperty(_package)) {
      throw new Error(`Package: ${_package} was already compiled`);
    }

    const newPkg = (this.packages[_package] = new DirNode(_package, this.src));

    this._compileFilesFromPackage(_package);

    this._log();
    this._log('package finished compiling', this.name);
    this._log();

    this.packagesUsed.push(_package);
  }

  pkg(packageName) {
    return this.packages[packageName];
  }

  render(dest, data, cb) {
    return mkDir(dest, { recursive: true })
      .then(() => this._renderAllDirectories(dest))
      .then(() => this._renderAllFiles(dest, data))
      .catch(function(err) {
        console.log('There was a error while rendering your template', err);
      });

    // Make all directorys first
    // this._renderAllDirectories(dest);
    // render all files
  }

  _renderAllFiles(dest, data) {
    this._log();
    this._log('+++++++++ render files +++++++++++++');
    this._log();
    const filesInProgress = this.compiledFiles.map(file => {
      // this._log(`   `, '-> created file ->', file._dest(dest));
      file.create(dest, data);
    });
    // .then(() => this._log(`File: Created at ${file._dest(dest)}`))
    return Promise.all(filesInProgress);
  }

  _renderAllDirectories(dest) {
    this._log();
    this._log('+++++++++ render directories +++++++++++++');
    this._log();
    const dirTracker = {};

    const dirsInProgress = [];

    this._getPackageArray().forEach(pkg => {
      this._log('package name', pkg.name);
      pkg.find({ type: 'dir' }).forEach(dirNode => {
        if (dirTracker.hasOwnProperty(dirNode.path)) return;
        const relativePathFromPkg = dirNode.getRelativePathFrom(pkg, false);
        const pkgPathInNewLocation = path.join(dest, relativePathFromPkg);

        this._log(`   `, '-> created', pkgPathInNewLocation);
        return mkDir(pkgPathInNewLocation).then(() => {
          dirTracker[dirNode.path] = true;
        });
      });
    });
    return Promise.all(dirsInProgress);
  }

  _compileFilesFromPackage(packageName) {
    const pkg = this.pkg(packageName);

    pkg.find({ type: 'file' }).forEach(fileNode => {
      this.compiledFiles.push(new File(fileNode));
    });
  }

  _getPackageArray() {
    return this.packagesUsed.map(pkgName => this.packages[pkgName]);
  }

  /**
   * Log only if verbose is true
   */
  _log() {
    this.opts.verbose && console.log.apply(console, arguments);
  }
}

// '/Users/marcelinoornelas/Desktop/development/Templates/__tests__/.tps/main
// 'main'
//
// /Users/marcelinoornelas/Desktop/development/Templates/src/hey

// const tps = new Templates();
// // console.log(path.join(__dirname, 'hey'));
// tps.use(path.join(__dirname, '../__tests__/'));

// tps.loadPackages(['main']);
// // // console.log(tps);
// tps.render(path.join(__dirname, 'hey'));

// console.log(tps);

module.exports = Templates;
