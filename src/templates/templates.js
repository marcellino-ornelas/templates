import path from 'path';
import fs from 'fs-extra';
import is from 'is';
import DirNode from '@tps/fileSystemTree';
import File from '@tps/File';
import * as TPS from '@tps/utilities/constants';
import { isDir, json, isFile } from '@tps/utilities/fileSystem';
import Config from '@tps/config';
import Prompter from '@tps/prompter';
import VerboseLogger from '@tps/utilities/verboseLogger';
import { eachObj, defaults, hasProp } from '@tps/utilities/helpers';
import {
  TemplateNotFoundError,
  SettingsUnkownFileTypeError,
  RequiresTemplateError,
  PackageAlreadyCompiledError,
  DirectoryNotFoundError,
  FileExistError
} from '@tps/errors';

/**
 * Default options for Templates
 * @typedef  {Object} TemplateOptions
 * @property {boolean} verbose - Log extra information to the console
 * @property {boolean} noLocalConfig - Don't load local `.tps/` config folder
 * @property {boolean} noGlobalConfig - Don't load global `.tps/` config folder
 * @property {boolean} defaultPackage - Don't load the default folder
 * @property {boolean} default - Use all default prompt answers
 * @property {boolean} force - Force creation of template. This will over write files
 */
const DEFAULT_OPTIONS = {
  verbose: false,
  noLocalConfig: false,
  noGlobalConfig: false,
  defaultPackage: true,
  default: false,
  force: false,
  newFolder: true
};

/**
 * @class
 * @classdesc Create a new instance of a template
 */
export default class Templates extends VerboseLogger {
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
    this.src = null;
    this.templateLocation = null;
    this._prompts = null;
    this.successfulBuilds = new SuccessfulBuild();
    this.buildErrors = [];
    this.data = {};
  }

  get config() {
    return this._config.configurations;
  }

  /**
   * Specify what template package you would like to use
   * @param {String} templateName - location to templating folder or url to Github
   * @param {object} [opts={}]    - options for use
   * @param {string} opts.tpsPath - `.tps/` folder you want to load template from
   */
  use(templateName, opts = {}) {
    if (!templateName || !is.string(templateName)) {
      throw new Error(
        'Use takes one string argument. The string can be a url to a Github repo or a global or local template name'
      );
    }

    const localPath = opts.tpsPath || TPS.LOCAL_PATH;
    const maybeLocalTemp = `${localPath}/${templateName}`;
    const maybeGlobalTemp = `${TPS.GLOBAL_PATH}/${templateName}`;

    switch (true) {
      case localPath && isDir(maybeLocalTemp):
        this.templateLocation = maybeLocalTemp;
        break;
      case TPS.GLOBAL_PATH && isDir(maybeGlobalTemp):
        this.templateLocation = maybeGlobalTemp;
        break;
      default:
        // throw new Error(`Template '${templateName}' was not found.`);
        throw new TemplateNotFoundError(templateName);
    }

    // set template location
    this.src = this.templateLocation;

    this.template = templateName;
    this._log(
      `[TPS INFO]: Found '${templateName}' template at ${this.templateLocation}`
    );

    this._loadTpsConfig(templateName);

    this._handleTpsConfig();

    this.templateSettingsPath = path.join(
      this.templateLocation,
      TPS.TEMPLATE_SETTINGS_FILE
    );

    // load Settings
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
        throw new SettingsUnkownFileTypeError(this.templateSettingsPath);
      }

      if (this.templateSettings.prompts) {
        this._log('[TPS INFO]: Loading prompts ...');
        this._prompts = new Prompter(this.templateSettings.prompts, {
          default: this.opts.default
        });

        this._prompts.setAnswers(this.config);
      }
    }

    // load default package if applicable
    const defaultFolder = path.join(this.templateLocation, 'default');
    if (this.opts.defaultPackage && isDir(defaultFolder)) {
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
    if (!this.templateLocation) {
      throw new RequiresTemplateError();
    }

    if (!is.string(newPackageName)) {
      throw new TypeError('Argument must be a string');
    }

    if (hasProp(this.packages, newPackageName)) {
      throw new PackageAlreadyCompiledError(newPackageName);
    }

    this.packages[newPackageName] = new DirNode(
      newPackageName,
      this.templateLocation
    );

    this._compileFilesFromPackage(newPackageName);

    this._log('package finished compiling', this.template);

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
      this._error('config must be a object');
    }
    if (this._prompts) {
      this._prompts.setAnswers(config);
    }
    return this._config.load(config);
  }

  /**
   * @param {String} dest - destination to render your new template to
   * @param {string|string[]} buildPaths - templates you would like to create
   * @param {Object} [data={}] - data to pass to doT. This will be used when rendering dot files/syntax
   * @returns {Promise}
   */
  render(dest, buildPaths, data = {}) {
    let dataForTemplating;
    let buildInDest = false;
    let pathsToCreate = buildPaths;
    let name = data.name;
    let finalDest = dest;
    const buildNewFolder = this.opts.newFolder;

    if (!buildPaths) {
      buildInDest = true;
      pathsToCreate = ['./'];
    } else if (is.string(buildPaths)) {
      pathsToCreate = [buildPaths];
    }

    this._log('[TPS INFO] Build paths: ', pathsToCreate);

    if (is.array.empty(buildPaths)) {
      this.error('Param `buildPaths` need to be a string or array of strings');
    }

    // Append dest config
    if (this.config.dest) {
      finalDest = path.join(dest, this.config.dest);
    }

    // Create absolute paths
    pathsToCreate = pathsToCreate.map(buildPath =>
      path.join(finalDest, buildPath)
    );

    this._log('[TPS INFO] Build new folder: ', buildNewFolder);

    return Promise.resolve()
      .then(() => {
        if (!isDir(finalDest)) {
          throw new DirectoryNotFoundError(finalDest);
        }
      })
      .then(() => this._answerRestOfPrompts())
      .then(() => {
        // this._log(`[TPS INFO]: Rendering template at (${finalDest})`);
        dataForTemplating = {
          ...data,
          template: this.template,
          config: { ...this.config }
        };
      })
      .then(() => {
        const builders = pathsToCreate.map(buildPath => {
          const { name, dir } = path.parse(buildPath);
          let realBuildPath = buildInDest || buildNewFolder ? buildPath : dir;
          const renderData = defaults({ name }, dataForTemplating);
          const doesBuildPathExist = isDir(realBuildPath);

          this._log('real build path', realBuildPath);

          return Promise.resolve()
            .then(() => {
              if (!this.opts.force && doesBuildPathExist) {
                return this._checkForFiles(realBuildPath, renderData);
              }
            })
            .then(() => {
              // Create a new folder unless told not to
              // if we are building the template in dest folder don't create new folder
              if (!buildInDest && buildNewFolder) {
                return (
                  fs
                    // change to mkdir(realBuildPath, { recursive: true }) needs node@^10.12.0
                    .ensureDir(realBuildPath)
                    .catch(err => {
                      console.log('errrrrrrrooooooorrrrrr', err);
                      /* noop function */
                    })
                );
              }
            })
            .then(() => this._renderAllDirectories(realBuildPath))
            .then(() => this._renderAllFiles(realBuildPath, renderData))
            .then(() => {
              this._log(`Template build at ${buildPath}`);
            })
            .catch(err => {
              this._log('Build Path error', err);
              this._scheduleCleanUpForBuild(
                realBuildPath,
                err,
                doesBuildPathExist
              );
            });
        });

        return Promise.all(builders).then(() => {
          if (is.array.empty(this.buildErrors)) {
            return;
          }

          this.buildErrors.forEach(({ buildPath, didBuildPathExist }) => {
            this._cleanUpFailBuild(
              buildPath,
              buildNewFolder && !didBuildPathExist
            );
          });

          this.buildErrors.forEach(({ buildPath, error }) => {
            console.log('Build path failed', buildPath);
            console.log(error);
          });

          const errors = this.buildErrors.map(({ error }) => error);

          return Promise.reject(errors.length === 1 ? errors[0] : errors);
        });
      })
      .catch(err => {
        if (!TPS.IS_TESTING) {
          console.log('There was a error while rendering your template');
          console.log(err);
        }
        return Promise.reject(err);
      });
  }

  _scheduleCleanUpForBuild(buildPath, err, didBuildPathExist) {
    this.buildErrors.push({
      buildPath: buildPath,
      error: err,
      didBuildPathExist
    });
  }

  _cleanUpFailBuild(buildError, buildNewFolder) {
    this._log('clean up has begun for', buildError);

    let buildPath = buildError;
    const buildPathNeedsSlash = buildPath[buildPath.length - 1] === path.sep;

    if (!buildPathNeedsSlash) {
      buildPath = buildPath + path.sep;
    }

    if (buildNewFolder) {
      fs.removeSync(buildPath);
    }

    let { files, dirs } = this.successfulBuilds;

    const filesIsEmpty = is.array.empty(files);
    const dirsIsEmpty = is.array.empty(dirs);

    if (filesIsEmpty && dirsIsEmpty) {
      return;
    }

    if (!dirsIsEmpty) {
      const dirsThatMatch = dirs.filter(dir => dir.includes(buildPath));

      dirsThatMatch.forEach(dir => {
        fs.removeSync(dir);

        // if directory is removed then we can remove all child files
        if (!filesIsEmpty) {
          files = files.filter(file => !file.includes(dir));
        }
      });
    }

    if (!filesIsEmpty) {
      files.forEach(file => {
        fs.removeSync(file);
      });
    }
  }

  _checkForFiles(dest, data) {
    for (let i = 0; i < this.compiledFiles.length; i++) {
      const file = this.compiledFiles[i];
      const finalDest = file._dest(dest, data);

      if (isFile(finalDest)) {
        throw new FileExistError(finalDest);
      }
    }
  }

  /**
   * Creates all files that our template uses in `dest` folder
   * @param {String} dest - destination path to render all files to
   * @param {Object} [data={}] - data passed in for dot
   */
  _renderAllFiles(dest, data) {
    this._log('+++++++++ render files +++++++++++++');

    const files = this.compiledFiles.filter(file => !file.isDot);
    const dotFiles = this.compiledFiles.filter(file => file.isDot);

    const dotContents = dotFiles.map(file => {
      /**
       * Will throw error if something is wrong with doT
       */
      return [file, file._dest(dest, data), file.fileDataTemplate(data)];
    });

    const filesInProgress = [];
    let hasErroredOut = false;
    let error;

    const handleFileErrorCatch = err => {
      if (!hasErroredOut) {
        hasErroredOut = true;
        error = err;
        this._log('[TPS] errored out', error);
      }
    };

    dotContents.forEach(([file, finalDest, dotContentsForFile]) => {
      this._log(` `, '-> ', finalDest);
      filesInProgress.push(
        file
          .renderDotFile(finalDest, dotContentsForFile)
          .catch(handleFileErrorCatch)
      );
    });

    files.forEach(file => {
      const finalDest = file._dest(dest, data);
      this._log(` `, '-> ', finalDest);
      filesInProgress.push(
        file.renderFile(finalDest).catch(handleFileErrorCatch)
      );
    });

    return Promise.all(filesInProgress).then(() => {
      if (hasErroredOut) {
        return Promise.reject(error);
      }
    });
  }

  /**
   * Creates all directories that our template uses in `dest` folder
   * @private
   * @param {String} dest - destination path to make all directories. Should be a folder
   */
  _renderAllDirectories(dest) {
    this._log('+++++++++ rendering directories +++++++++++++');

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
        const dirInProgress = fs
          .mkdir(dirPathInNewLocation)
          .then(() => {
            this.successfulBuilds.dirs.push(dirPathInNewLocation);
            this._log(`   `, '-> created', dirPathInNewLocation);
          })
          .catch(() => {
            /* do nothing if dir already exist */
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
    const { force } = this.opts;

    pkg.find({ type: 'file' }).forEach(fileNode => {
      this.compiledFiles.push(new File(fileNode, { force }));
    });
  }

  /**
   * Creates a array of all packages user wants for render process successful
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
            if (this._prompts.getPrompt(answerName).isPkg()) {
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
            }
            this._config.set(answerName, answer);
          });
        });
  }

  /**
   * Configurations
   */

  _handleTpsConfig() {
    const { dest } = this.config;

    if (dest) {
      if (path.isAbsolute(dest)) {
        this._error(`[tpsrc Config]: dest cannot be a a absolute path`);
      }
    }
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

function SuccessfulBuild() {
  this.files = [];
  this.dirs = [];
}

// module.exports = Templates;
