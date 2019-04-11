import dot from 'dot';
import path from 'path';
import fs from 'fs';
import is from 'is';
import DirNode from '@tps/fileSystemTree';
import File from '@tps/File';
import * as TPS from '@tps/utilities/constants';
import { isDir, json, isFile } from '@tps/utilities/fileSystem';
import { promisify, defaults } from '@tps/utilities/helpers';
import Config from '@tps/config';
import Prompter from '@tps/prompter';
import VerboseLogger from '@tps/utilities/verboseLogger';
import { eachObj } from './utilities/helpers';

dot.templateSettings.strip = false;

/**
 * Default options for Templates
 * @typedef  {Object} TemplateOptions
 * @property {boolean} verbose - log extra information to the console
 */
const DEFAULT_OPTIONS = {
  verbose: false,
  noLocalConfig: false,
  noGlobalConfig: false
};

const mkDir = promisify(fs.mkdir, fs);

/**
 * @class
 * @classdesc Create a new instance of a template
 */
class Templates extends VerboseLogger {
  /**
   * @param {TemplateOptions} opts - options to pass to templates
   */
  constructor(opts = {}) {
    super(opts.verbose);
    this.opts = defaults(opts, DEFAULT_OPTIONS);
    this.packages = {};
    this.packagesUsed = [];
    this.compiledFiles = [];
    this._config = new Config();
  }

  get config() {
    return this._config.configurations;
  }

  /**
   * Specifiy what template package you would like to use
   * @param {String} templateName - location to templating folder or url to github
   * @param {object} [opts={}]    - options for use
   * @param {string} opts.tpsPath - .tps folder you want to load template from
   */
  use(templateName, opts = {}) {
    if (!templateName || !is.string(templateName)) {
      throw new Error(
        'Use takes one string argument. The string can be a url to a github repo or a global or local template name'
      );
    }

    const localPath = opts.tpsPath || TPS.LOCAL_PATH;
    const maybe_local_temp = `${localPath}/${templateName}`;
    const maybe_global_temp = `${TPS.GLOBAL_PATH}/${templateName}`;

    switch (true) {
      case localPath && isDir(maybe_local_temp):
        this.src = maybe_local_temp;
        break;
      case TPS.GLOBAL_PATH && isDir(maybe_global_temp):
        this.src = maybe_global_temp;
        break;
      default:
        throw new Error(`Template '${templateName}' was not found.`);
    }

    this.template = templateName;
    this._log(`[TPS INFO]: Found '${templateName}' template at ${this.src}`);

    this.templateSettingsPath = path.join(this.src, TPS.TEMPLATE_SETTINGS_FILE);

    if (isFile(this.templateSettingsPath)) {
      this._log(
        `[TPS INFO]: Loading ${templateName} settings file ${
          this.templateSettingsPath
        }`
      );

      try {
        this.templateSettings = require(this.templateSettingsPath) || {};
      } catch (e) {
        throw new Error(
          `Could not load settings file! Please make sure this file is a json or js file ${
            this.templateSettingsPath
          } `
        );
      }

      if (this.templateSettings.prompts) {
        this._log('[TPS]: Loading prompts ...');
        this._prompts = new Prompter(
          this.templateSettings.prompts,
          this.config
        );
      }
    }

    this._loadTpsConfig(templateName);
    // TODO
    // load settings && load default packages
  }

  /**
   * Include packages to use in the render process
   * @param {string|string[]} packages - packages from the template package you would like to use
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
    this._log('package finished compiling', this.template);
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
   * @param {object} obj - object to load configs from
   * @returns {Templates} `this`
   */
  loadConfig(obj) {
    if (!is.object(obj)) {
      throw new Error('loadConfig takes a object as a argument');
    }
    return this._config.load(obj);
  }

  /**
   * @param {String} dest - destination to render your new template to
   * @param {Object} [data={}] - data to pass to doT. This will be used when rendering dot files/syntax
   * @param {Function} [cb] - callback function to call when done
   * @returns {Promise} return promise when done if no cb is defined
   */
  render(dest, data = {}) {
    return (
      Promise.resolve()
        // .then(() => this._answerRestOfPrompts())
        .then(() => !isDir(dest) && mkDir(dest, { recursive: true }))
        .then(() => this._renderAllDirectories(dest))
        .then(() => this._renderAllFiles(dest, data))
        .catch(function(err) {
          console.log('There was a error while rendering your template', err);
          process.exit(1);
        })
    );
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
    const filesInProgress = this.compiledFiles.map(file =>
      file.create(dest, data)
    );
    return Promise.all(filesInProgress);
  }

  /**
   * Creates all directories that our template uses in `dest` folder
   * @private
   * @param {String} dest - destination path to make all directories. Should be a folder
   */
  _renderAllDirectories(dest) {
    this._log();
    this._log('+++++++++ rendering directories +++++++++++++');
    this._log();

    const dirTracker = {};
    const dirsInProgress = [];

    this._getPackageArray().forEach(pkg => {
      // this._log('package name', pkg.name);

      pkg.find({ type: 'dir' }).forEach(dirNode => {
        /* skip if directory has already been made */
        if (dirTracker.hasOwnProperty(dirNode.path)) return;
        const dirPathRelativeFromPkg = dirNode.getRelativePathFrom(pkg, false);
        const dirPathInNewLocation = path.join(dest, dirPathRelativeFromPkg);

        /* mark directory as already made */
        dirTracker[dirNode.path] = true;
        const dirInProgress = mkDir(dirPathInNewLocation).then(() => {
          this._log(`   `, '-> created', dirPathInNewLocation);
        });

        dirsInProgress.push(dirInProgress);
      });
    });

    return dirsInProgress.length && Promise.all(dirsInProgress);
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

  _answerRestOfPrompts() {
    return !this._prompts
      ? null
      : this._prompts.getAnswers().then(answers => {
          console.log('ANSWERS', answers);
          eachObj(answers, (answer, answerName) => {
            if (!answer)
              switch (true) {
                case is.bool(answer):
                  return this.loadPackage(answerName);
                case is.string(answer) && answer.length:
                  return this.loadPackage(answer);
                case is.array(answer) && !is.array.empty(answer):
                  return this.loadPackages(answer);
                default:
                  throw new Error(
                    'Data type is not supported as answer to a tps prompt'
                  );
              }
          });
        });
  }

  _loadTpsConfig(templateName) {
    if (!this.opts.noGlobalConfig && TPS.HAS_GLOBAL) {
      let globalConfig = json(TPS.GLOBAL_CONFIG_PATH);
      return this._loadTpsSpecificConfig(templateName, globalConfig);
    }

    if (!this.opts.noLocalConfig && TPS.LOCAL_CONFIG_PATH) {
      const localConfig = json(TPS.LOCAL_CONFIG_PATH);
      return this._loadTpsSpecificConfig(templateName, localConfig);
    }
  }

  _loadTpsSpecificConfig(templateName, config) {
    const hasConfigObject =
      config.hasOwnProperty(templateName) && is.object(config[templateName]);

    if (hasConfigObject) {
      return this.loadConfig(config[templateName]);
    }
  }
}

module.exports = Templates;
