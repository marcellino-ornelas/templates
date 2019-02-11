/* jshint esversion: 6 */

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
 Use this package as a full generater for anything.(Hopes)
 should be able to 

  with template command
    how am i gonna pass data from command line?
      -- template specified promts?

  with use command
    Grab a template folder from github/local-cache/local. Store to cache??
    how about use in two or more packages?
      -- soon as one shared promt gets hit then toss. so no repeats
    how am i going to allow users to add prompts but might only neeed some in certain packages?
      -- some config file

      example: .prompts.js
        {
          default: [
            {
              (question: string): question to promt to user
              (package: string | boolean): ( name )
                IF TRUE use value as name
                  WHAT IF value is true or false
                    throw error?
                    neeed to have validator?
                ELSE IF <NAME> use package if answer to question is truthy
                ELSE use default if any

              (var: string | boolean): 
                IF TRUE use value as name
                  WHAT IF value is true or false
                    throw error?
                    have validator? no....

              (default: string | null): default value to have when there is no value
            }
          ],
          main: [

          ],
          'main:day:june': []

        }

        {
          question: 'would you like to use mongo db?'
          package: 'mongodb'
        }

        {
          question: 'what templating engine would you like to use?'
          validate: /handlebars|jade|dot/
          package: true
        }

    why would you want to create a interface( command line flags for certain things )?
      -- object holding commander commind line options?
      WHAT IF user has prompts and interface???
        what one overrides the other???
          dont allow this?
          ??? have interface override any promts questions ???
            ??? cli usually does this in other programs and in ccr ???

            ???? why would there be a dulpicate ????


    WHAT HAPPENED TO local settings?
      is there a point?
        links?
          create links.js ??????
        NO point to have this feature because this sets defaults which interfaces or prompts will do.


    .interface.js
      {
        flag: string of flag to use

        package: name of the package that links to it
          IF TRUE use value as name also.
             WHAT IF value is true or false?
              throw error?
              use commander flag interface name as package?

        var: Variable name to link data to
          IF TRUE use value as variable name?
            WHAT IF value is true or false
              throw error?
              use flag name as variable name?


      }

    example:

    interface.js
      {
        flag: '-c, --no-css'
        package: '',
        default: 'css'
      }

      templates -c --use react-component


      options.css = false; -> css(package)


      {
        flag: '-f, --functional'
        package: 'functional'
        default: 'component'
      }

      {
        flag: '-s, --css-type <css-extention>'
        var: true,
        default: 'css'

      }

      packages.js
        add links to here?
      {
        default: [ 'index' ]
      }

      templates 
          --use <(local-folder|github repo?|another node_module?)>
          --as <name of folder to save to>
          --no-default ( turn off default package  )
          --packages <list of additional packages to render>
          --var <list of information to use>

          ... user specifided options from interface



*/

/*
var Templates = require('Templates');

const template = new Template( opts:any );


template.vars
templates.addVar(name: string, value: any)

should compile everything dot, js, def
template.use(templateLocation: string | git url, packages )

template.as()

template.render(name: --as flag | string )
*/

/*
 -- USE --
  use function will always pull ./.templates

  // cache template name
  templates 
    --use react-components


  // github 
  templates 
    --use marcellino-ornelas/react-components
  
  // local
  templates 
    --use .
 */

/*
 -- Packages --
  should be able to add additional packages to list

  // one or more package
  templates 
    --use react-components
    --packages database,jade,mongoose || --packages database
 */

/*
  -- Promts --

  {
    question: String,
    package: String | boolean,
    variable: String | Boolean,
    answer: Func
    default: String<defaultValue> | Boolean
    required: Boolean
  }

  question: question to ask the user
  
  


  // flag?: Commander Flag (ex: '-c, --c'),
  flag: commander flag to accept as answer. Will not prompt if flag is defined,
    --no-flag turns into ( flag: false ) else ( flag: true ).


 */

/*
 -- VAR --
  should not use a static schema but document what could be used from a `template-maker`
  VARIABLES must be unique. cannot have same name as package
    if variable name matches an package name then will use `value<Boolean>` for package.

  // Boolean
  templates 
    --use react-components
    --var css=true
    --var css=false
    --var css // <- true


  // string
  templates 
    --use react-components
    --var name=marcellino
  
  // array
  templates 
    --use react-components
    --var modules=express,body-parser
 */

const CACHE_LOCATION = path.join(
  process.env[path.sep === '/' ? 'HOME' : 'home'],
  '.templates'
);

//  make sure cache location exists
fs.ensureDirSync(CACHE_LOCATION);

/*
 * Templates
 */
class Template {
  constructor(opts = defaultOpts) {
    this.templates = {};
    this.packages = [];
    this.opts = opts;
    this.src = '';

    // new feature
    this._defs = {};
  }

  /**
   * specifiy what template folder to use for rendering
   * @param  { String }        templateLocation - location to templating folder or url to github
   * @param  { Array<String> } packages         - list of packages to include
   * @return { undefined }
   */
  use(templateLocation, packages) {
    if (!templateLocation || utils.isString(templateLocation)) {
      throw new Error(
        'Use takes one string argument. The string can be a url to a github repo or a path to local file'
      );
    }

    const isLocationAbsolute = path.isAbsolute(templateLocation);

    switch (true) {
      // case !isLocationAbsolute && /\//g.test(templateLocation):
      //   console.log('github coming soon');
      //   break;

      case !/\W/gi.test(templateLocation):
        const cachedPackageLocation = path.join(
          CACHE_LOCATION,
          templateLocation
        );

        if (!utils.isDir(cachedPackageLocation)) {
          throw new Error(
            'No cached template found. Please use a valid template name'
          );
        }

        this.src = path.join(cachedPackageLocation, '.template');
        break;

      default:
        const src = isLocationAbsolute ? templateLocation : process.cwd();
        this.src = path.join(src, '.template');
        break;
    }

    // load packages
    packages && this._loadPackages(packages);
  }

  _loadPackages(packages = []) {
    if (!Array.isArray(packages)) {
      if (!utils.isString(packages)) {
        throw new Error(
          'Use: package argument must be a string or array of strings'
        );
      }
      packages = [packages];
    }

    this.packages = (this.packages || []).concat(packages);

    packages.forEach(_package => {
      this.templates[_package] = this._retrievePackage(_package);
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

    transverseFileTree(PACKAGE_PATH, function(name, relPath, isDir) {
      // full path to file relative to src path
      const fullPath = path.join(relPath, name);

      if (isDir) {
        template.directories.push(fullPath);
      } else {
        /*is file*/
        const srcDir = path.join(PACKAGE_PATH, relPath);
        const file = new File(srcDir, relPath, name);

        template.files.push(file);
      }
    });

    return template;
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
  render(dest, data, cb) {
    if (!dest || utils.isString(dest)) {
      throw new Error('some error message for parameters');
    }

    if (!cb && utils.isFunc(data)) {
      cb = data;
      data = {};
    }

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
    const packagesToObject = self.packages.reduce(function(acc, next) {
      acc[next] = true;
      return acc;
    }, {});
    return new Promise(function(resolve, reject) {
      async.each(
        files,
        function(file, done) {
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

  log() {
    return this.opts.verbose && console.log.apply(console, arguments);
  }
}

/*
 * Helper functions
 * Move all to utils
 */

function transverseFileTree(src, cb) {
  const compilePackageDirectory = function(srcPath, relativePathFromSrc = '') {
    let directoryContents = [];

    try {
      directoryContents = fs.readdirSync(srcPath);
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

// /*
//  * trys
// */

// const tempPath = path.join(__dirname, '../templates/');
// const t = new Template();

// t.use(tempPath, 'main');

// // console.log(t.templates.main.files);

// t.render(path.join(__dirname, '../dest'), { name: 'lino' }, function() {
//   console.log('done');
// });

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
