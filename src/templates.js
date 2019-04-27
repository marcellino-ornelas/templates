import dot from 'dot';
import path from 'path';
import fs from 'fs';
import is from 'is';
import DirNode from '@tps/fileSystemTree';
import File from '@tps/File';
import * as TPS from '@tps/utilities/constants';
import { isDir, json, isFile } from '@tps/utilities/fileSystem';
import Config from '@tps/config';
import Prompter from '@tps/prompter';
import VerboseLogger from '@tps/utilities/verboseLogger';
import { eachObj, promisify, defaults, hasProp } from '@tps/utilities/helpers';

dot.templateSettings.strip = false;

/**
 * Default options for Templates
 * @typedef  {Object} TemplateOptions
 * @property {boolean} verbose - Log extra information to the console
 * @property {boolean} noLocalConfig - Don't load local `.tps/` config folder
 * @property {boolean} noGlobalConfig - Don't load global `.tps/` config folder
 * @property {boolean} default - Don't load the default folder
 * @property {bool} force - Force creation of template. This will over write files
 */
const DEFAULT_OPTIONS = {
  verbose: false,
  noLocalConfig: false,
  noGlobalConfig: false,
  default: true,
  force: false
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
   * @param {String} templateName - location to templating folder or url to Github
   * @param {object} [opts={}]    - options for use
   * @param {string} opts.tpsPath - `.tps/` folder you want to load template from
   */
  use(templateName, opts = {}) {
    if (!templateName || !is.string(templateName)) {
      throw new Error(
        'Use takes one string argument. The string can be a url to a github repo or a global or local template name'
      );
    }

    const localPath = opts.tpsPath || TPS.LOCAL_PATH;
    const maybeLocalTemp = `${localPath}/${templateName}`;
    const maybeGlobalTemp = `${TPS.GLOBAL_PATH}/${templateName}`;

    switch (true) {
      case localPath && isDir(maybeLocalTemp):
        this.src = maybeLocalTemp;
        break;
      case TPS.GLOBAL_PATH && isDir(maybeGlobalTemp):
        this.src = maybeGlobalTemp;
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
        // eslint-disable-next-line
        this.templateSettings = require(this.templateSettingsPath) || {};
      } catch (e) {
        throw new Error(
          `Could not load settings file! Please make sure this file is a json or js file ${
            this.templateSettingsPath
          } `
        );
      }

      if (this.templateSettings.prompts) {
        this._log('[TPS INFO]: Loading prompts ...');
        this._prompts = new Prompter(
          this.templateSettings.prompts,
          this.config
        );
      }
    }

    this._loadTpsConfig(templateName);

    // load default package if applicable
    const defaultFolder = path.join(this.src, 'default');
    if (this.opts.default && isDir(defaultFolder)) {
      this.loadPackage('default');
    }
  }

  /**
   * Include packages to use in the render process
   * @param {string|string[]} newPackages - packages from the template package you would like to use
   */
  loadPackages(newPackages) {
    let packages = newPackages;
    if (!Array.isArray(packages)) {
      if (is.string(packages) && packages) {
        packages = [packages];
      } else {
        throw new TypeError('Argument must be a string or an array of stings');
      }
    }

    packages.forEach(p => this.loadPackage(p));
  }

  /**
   * @param {String} newPackage - package from the template you would like to use
   */
  loadPackage(newPackageName) {
    if (!this.src) {
      throw new Error('Must specify a template folder to use');
    }

    if (!is.string(newPackageName)) {
      throw new TypeError('Argument must be a string');
    }

    if (hasProp(this.packages, newPackageName)) {
      throw new Error(`Package: ${newPackageName} was already compiled`);
    }

    this.packages[newPackageName] = new DirNode(newPackageName, this.src);

    this._compileFilesFromPackage(newPackageName);

    this._log();
    this._log('package finished compiling', this.template);
    this._log();

    this.packagesUsed.push(newPackageName);
  }

  /**
   * @param {String} packageName - name of a package
   * @returns {DirNode} - directory tree representation of package
   */
  pkg(packageName) {
    return this.packages[packageName];
  }

  /**
   * @param {object} config - object to load configs from
   * @returns {Templates} `this`
   */
  loadConfig(config) {
    if (!is.object(config)) {
      throw new Error('config must be a object');
    }
    if (this._prompts) {
      this._prompts.setAnswers(config);
    }
    return this._config.load(config);
  }

  /**
   * @param {String} dest - destination to render your new template to
   * @param {Object} [data={}] - data to pass to doT. This will be used when rendering dot files/syntax
   * @param {Function} [cb] - callback function to call when done
   * @returns {Promise} return promise when done if no cb is defined
   */
  render(dest, data = {}) {
    return Promise.resolve()
      .then(() => this._answerRestOfPrompts())
      .then(() => {
        if (!this.opts.force && isDir(dest)) {
          throw new Error('Directory already exists. Aborting process');
        } else {
          mkDir(dest, { recursive: true });
        }
      })
      .then(() => this._renderAllDirectories(dest))
      .then(() => this._renderAllFiles(dest, data))
      .catch(err => {
        if (TPS.IS_TESTING) {
          throw err;
        } else {
          console.log('There was a error while rendering your template');
          console.log(err);
          process.exit(1);
        }
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
        if (hasProp(dirTracker, dirNode.path)) return;
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
          eachObj(answers, (answer, answerName) => {
            switch (true) {
              case is.undef(answer):
                break;
              case is.bool(answer):
                this.loadPackage(answerName);
                break;
              case is.string(answer) && !!answer.length:
                this.loadPackage(answer);
                break;
              case is.array(answer) && !is.array.empty(answer):
                this.loadPackages(answer);
                break;
              default:
                throw new Error(
                  'Data type is not supported as answer to a tps prompt'
                );
            }
            this._config.set(answerName, answer);
          });
        });
  }

  _loadTpsConfig(templateName) {
    if (!this.opts.noGlobalConfig && TPS.HAS_GLOBAL) {
      const globalConfig = json(TPS.GLOBAL_CONFIG_PATH);
      this._loadTpsSpecificConfig(templateName, globalConfig);
    }

    if (!this.opts.noLocalConfig && TPS.LOCAL_CONFIG_PATH) {
      const localConfig = json(TPS.LOCAL_CONFIG_PATH);
      this._loadTpsSpecificConfig(templateName, localConfig);
    }
  }

  _loadTpsSpecificConfig(templateName, config) {
    const hasConfigObject =
      hasProp(config, templateName) && is.object(config[templateName]);

    if (hasConfigObject) {
      this.loadConfig(config[templateName]);
    }
  }
}

module.exports = Templates;
