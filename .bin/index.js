#!/usr/bin/env node

/*
 * Create React Component
*/

const program = require('commander');
// const settings = require('./lib/settings');
// const fs = require('fs-extra');
// const path = require('path');

// const utils = require('./lib/utils');

// const CWD = process.cwd();

// try {
//   /**
//    * User local setting
//    *
//    * Look at settings module './lib/settings'
//    */
//   var localSettings = fs.readJsonSync(path.join(CWD, '.ccr', 'settings.json'));

//   settings.import(localSettings);
// } catch (e) {
//   settings.get('verbose') &&
//     console.log(
//       'Local settings were not located. Using default settings for configuration...'
//     );
// }

// const createReactComponents = require('./lib');

program.version('1.0.0');

var unknown = [];

// Need to use prependListener so it calls event before action
program.prependListener('command:use', function(args, _unknown) {
  // can only grab unknown flags here
  // can save unknown flags for later use and continue with default
  // console.log(arguments);
  // console.log('unknowns...', _unknown);
  // store unknown arguments
  unknown = _unknown.concat();
});

program
  .command('use <location>')
  .alias('u')
  .allowUnknownOption(true)
  .description('use templating folder for rendering')
  .option('-a, --as <as>', 'Name of folder you want to save contents to')
  .option(
    '-p, --packages <packages...>',
    'Name of the packages you would like to render'
  )
  // ??? .option('-d, --no-default', 'Dont include default folder') ???
  // .option('-v, --var', 'information to add to program')
  .action(function(location, options) {
    // parse args
    console.log(location, unknown);
    // console.log(options);
  });

// program
//   .command('init')
//   .option(
//     '-t, --templates',
//     'Configure this repo to use template functionality'
//   )
//   .alias('i')
//   .description('create local configuration settings for a repo to use')
//   .action(function(options) {
//     var initProgress = createReactComponents.initializeLocalSettings(CWD);

//     if (options.templates) {
//       settings.set('templates', true);
//       initProgress.then(createReactComponents.initializeTemplates(CWD));
//     }
//   });

// program
//   .command('template')
//   .alias('t')
//   .description('initalize templating')
//   .action(function(options) {
//     createReactComponents.initializeTemplates(CWD);
//   });

// program
//   .command('create <components...>')
//   .option('-v, --verbose', 'logs', false)
//   .option('-c, --css-type <ext>', 'change extention for css file', 'css')
//   .option(
//     '-f, --functional',
//     'Use functional component instead of a state component',
//     false
//   )
//   .option(
//     '-i, --no-index',
//     "Don't include default index file for the components you create"
//   )
//   .option('-s, --no-css', "Don't include a css for the component(s) you create")
//   .option(
//     '-d, --no-default',
//     "Don't include any of the default packages for react.(index, style, component or functional)"
//   )
//   .option(
//     '-t, --test',
//     'Include a testing file for the component(s) you create'
//   )
//   .option(
//     '-r, --extend-cwd <path>',
//     'A path to add on to your current working directory'
//   )
//   .option(
//     '-p, --packages <packages>',
//     'A path to add on to your current working directory'
//   )
//   .alias('c')
//   .description('create a new component')
//   .action(function(files, options) {
//     deleteDefaultBoolFlags(options);
//     optionsToSettings(options);

//     createReactComponents(CWD, files);
//   });

program.parse(process.argv);

/*
 * Helper Functions
*/

/*
 * Deletes the property from commander with flags 
 * that have: ( --no-* ) so that it doesnt override
 * settings from users style sheet
*/
function deleteDefaultBoolFlags(options) {
  options.options.forEach(function(option) {
    const prop = option.attributeName();
    const isBoolFlag = /^--no/.test(option.long);

    if (isBoolFlag && options[prop]) {
      options[prop] = undefined;
    }
  });
}

function optionsToSettings(_program) {
  _program.options.forEach(function(option) {
    var prop = option.attributeName();
    settings.set(prop, _program[prop], true);
  });
}
