const dot = require('dot');
const path = require('path');
const fs = require('fs');
const is = require('is');
const utils = require('./utils');
const { DirNode } = require('./FileTree');
// const Tree = require();

let test = true;
const verbose = false;

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
    this.opts = {};
    this.packages = {};
    this.packagesUsed = [];
  }

  /**
   * Log only if verbose flag is set
   */
  log() {
    this.opts.verbose && console.log.apply(console, arguments);
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

    this.packages[_package] = new DirNode(_package, this.src);
    this.packagesUsed.push(_package);
  }

  render(dest, data, cb) {
    return mkDir(dest, { recursive: true })
      .then(() => this._renderAllDirectories(dest))
      .then(() => this._renderAllFiles(dest))
      .catch(function(err) {
        console.log('There was a error while rendering your template', err);
      });

    // Make all directorys first
    // this._renderAllDirectories(dest);
    // render all files
  }

  _renderAllFiles() {}

  _renderAllDirectories(dest) {
    const dirsInProgress = [];
    const dirTracker = {};

    const packages = this.packagesUsed.map(pkgName => this.packages[pkgName]);

    packages.forEach(pkg => {
      const dirNodes = pkg.depthFirstSelect(function(tree) {
        return !tree.isRoot() && tree.is('dir');
      });

      const pkgDirsToBeMade = dirNodes
        .filter(dirNode => !dirTracker.hasOwnProperty(dirNode.path))
        .forEach(function(dirNode) {
          const relativePathFromPkg = dirNode.getRelativePathFrom(pkg, false);
          const pkgPathInNewLocation = path.join(dest, relativePathFromPkg);

          const dirInProgress = mkDir(pkgPathInNewLocation).then(function() {
            dirTracker[dirNode.path] = true;
          });

          dirsInProgress.push(dirInProgress);
        });
    });

    return Promise.all(dirsInProgress);
  }
}

// '/Users/marcelinoornelas/Desktop/development/Templates/__tests__/.tps/main
// 'main'
//
// /Users/marcelinoornelas/Desktop/development/Templates/src/hey

// const tps = new Templates();
// console.log(path.join(__dirname, 'hey'));
// tps.use(path.join(__dirname, '../__tests__/'));

// tps.loadPackages(['main']);
// // console.log(tps);
// tps.render(path.join(__dirname, 'hey'));

// console.log(tps);

module.exports = Templates;
