import dot from 'dot';
import path from 'path';
import fs from 'fs';
import is from 'is';
import utils from './utils';
import DirNode from './fileSystemTree';
import File from './File';

dot.templateSettings.strip = false;

/**
 * Default options for Templates
 * @namespace
 * @constant
 * @property {Boolean} verbose - log extra information to the console
 */
const DEFAULT_OPTIONS = {
  verbose: false
};

const mkDir = utils.promisify(fs.mkdir, fs);

/**
 * Template class
 * @class
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
   * Specifiy what template package you would like to use
   * @param {String}   templateLocation - location to templating folder or url to github
   * @param {String[]} packages         - list of packages to include
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
   * @param {String|String[]} packages - packages from the template package you would like to use
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
   * @param {String} _package - package from the template you would like to use
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

  /**
   * @param {String} packageName - name of a package
   * @returns {DirNode} - directory tree repesentation of package
   */
  pkg(packageName) {
    return this.packages[packageName];
  }

  /**
   * @param {String} dest - destination to render your new template to
   * @param {Object} [data={}] - data to pass to doT. This will be used when rendering dot files/syntax
   * @param {Function} [cb] - callback function to call when done
   * @returns {Promise} return promise when done if no cb is defined
   */
  render(dest, data = {}, cb) {
    return mkDir(dest, { recursive: true })
      .then(() => this._renderAllDirectories(dest))
      .then(() => this._renderAllFiles(dest, data))
      .catch(function(err) {
        console.log('There was a error while rendering your template', err);
      });
  }
  /**
   * Creates all files that our template uses in `dest` folder
   * @param {String} dest - destination path to render all files to
   * @param {Object} [data={}] - data passed in for dot
   */
  _renderAllFiles(dest, data) {
    this._log();
    this._log('+++++++++ render files +++++++++++++');
    this._log();
    const filesInProgress = this.compiledFiles.map(file => {
      file.create(dest, data);
    });
    return Promise.all(filesInProgress);
  }

  /**
   * Creates all directories that our template uses in `dest` folder
   * @private
   * @param {String} dest - destination path to make all directories. Should be a folder
   */
  _renderAllDirectories(dest) {
    this._log();
    this._log('+++++++++ render directories +++++++++++++');
    this._log();

    const dirTracker = {};
    const dirsInProgress = [];

    this._getPackageArray().forEach(pkg => {
      this._log('package name', pkg.name);

      pkg.find({ type: 'dir' }).forEach(dirNode => {
        /* skip if directory has already been made */
        if (dirTracker.hasOwnProperty(dirNode.path)) return;
        const dirPathRelativeFromPkg = dirNode.getRelativePathFrom(pkg, false);
        const dirPathInNewLocation = path.join(dest, dirPathRelativeFromPkg);
        this._log(`   `, '-> created', dirPathInNewLocation);
        return mkDir(dirPathInNewLocation).then(() => {
          /* mark directory as already made */
          dirTracker[dirNode.path] = true;
        });
      });
    });
    return Promise.all(dirsInProgress);
  }
  /**
   * Compile all files that need to be made for render process
   * @private
   * @param {String} packageName - name of package
   */
  _compileFilesFromPackage(packageName) {
    const pkg = this.pkg(packageName);

    pkg.find({ type: 'file' }).forEach(fileNode => {
      this.compiledFiles.push(new File(fileNode));
    });
  }

  /**
   * Creates a array of all packages user wants for render process
   * @private
   * @returns {DirNode[]} - array of all the packages
   */
  _getPackageArray() {
    return this.packagesUsed.map(pkgName => this.pkg(pkgName));
  }

  /**
   * Log only if verbose is true
   * @private
   */
  _log() {
    this.opts.verbose && console.log.apply(console, arguments);
  }
}

module.exports = Templates;
