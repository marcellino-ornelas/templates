// @ts-check
const fs = require('fs-extra');
const path = require('path');
const errorExit = require('../lib/error-exit');
const Template = require('../../lib/templates');
const { DirectoryNode } = require('../../lib/fileSystemTree/directoryNode');
const { FileNode } = require('../../lib/fileSystemTree/fileNode');
const TPS = require('../../lib/utilities/constants');
const { isDir, json } = require('../../lib/utilities/fileSystem');

exports.command = 'migrate [name]';

exports.description = 'Migrate from create components react';

exports.builder = {};

const changes = [
  {
    match: 'it.component.name',
    changeTo: 'tps.name',
  },
  {
    match: 'it.component.dir',
    changeTo: 'tps.dir',
  },
  {
    match: 'it.packages',
    changeTo: 'tps.packages',
  },
  {
    match: 'it.settings',
    changeTo: 'tps.answers',
  },
];

const convertText = (text) =>
  changes.reduce(
    (acc, { match, changeTo }) => acc.replaceAll(match, changeTo),
    text
  );

exports.handler = (argv) => {
  const name = argv.name || 'react-component';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const localTps = TPS.LOCAL_PATH;
  const cwd = process.cwd();
  const ccrPath = path.join(cwd, '.ccr');
  const ccrTemplatesPath = path.join(ccrPath, 'templates');

  if (!TPS.IS_TPS_INITIALIZED) {
    errorExit(
      new Error(
        `Directory must be initialized with templates. Please run 'tps init'`
      )
    );
  }

  // check to see if .ccr exists
  if (!isDir(ccrPath)) {
    errorExit(
      new Error(
        'No create components react directory. You sure your in the right place?'
      )
    );
    process.exit(1);
  }

  const ccrTemplates = new DirectoryNode(ccrTemplatesPath, null, false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newTemplatePath = path.join(localTps, name);

  fs.ensureDirSync(newTemplatePath);

  ccrTemplates.depthFirstEach((child) => {
    // eslint-disable-next-line no-useless-return
    if (ccrTemplates === child) return;

    if (child instanceof FileNode) {
      // eslint-disable-next-line no-underscore-dangle
      const data = child._getFileData().toString();
      const newFilePath = path.join(
        newTemplatePath,
        convertText(child.pathFromRoot)
      );
      console.log('Creating File: ', newFilePath);
      fs.writeFileSync(newFilePath, convertText(data));
    } else {
      const newDirPath = path.join(
        newTemplatePath,
        convertText(child.pathFromRoot)
      );
      console.log('Creating Dir: ', newDirPath);
      fs.ensureDirSync(newDirPath);
    }
  });

  const {
    extendCwd,
    verbose,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not supported
    default: defaultPackages,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not supported
    templates,
    ...answers
  } = json(path.join(ccrPath, 'settings.json'));
  const tpsrcPath = path.join(TPS.DEFAULT_TPS, '.tpsrc');
  const tpsrc = json(tpsrcPath);
  const opts = {};

  if (verbose) opts.verbose = verbose;
  if (extendCwd) opts.extendedDest = extendCwd;

  tpsrc[name] = {
    opts,
    answers,
  };

  fs.writeJSONSync(tpsrcPath, tpsrc, { EOL: '\r\n', spaces: 2 });
};
