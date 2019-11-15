import { tpsCli, buildFlags } from '@test/utilities/helpers';
import { INIT_PACKAGE_FILES } from '@test/utilities/constants';
import path from 'path';
import is from 'is';
import fs from 'fs-extra';

/**
 * @command init
 */
export const init = (cwd, flags = {}, opts = {}) => {
  const tpsFolder = path.join(cwd, '.tps');
  const flagString = buildFlags(flags);

  expect(cwd).toBeDirectory();

  return tpsCli(`init ${flagString}`, { cwd, ...opts }).then(stdout => {
    expect(stdout).toContain('tps initialized');
    expect(tpsFolder).toBeDirectory();
    expect(tpsFolder).toHaveAllFilesAndDirectories(INIT_PACKAGE_FILES);
  });
};

/**
 * @command new
 */
export const newTemplate = (cwd, template) => {
  const testTemplateDefault = path.join(cwd, '.tps/test/default');

  expect(testTemplateDefault).not.toBeDirectory();

  return tpsCli(`new template ${template}`, { cwd }).then(() => {
    expect(testTemplateDefault).toBeDirectory();
  });
};

const templateSpecs = {
  testing: [
    './index.js',
    './db',
    './db/db.js',
    './server',
    './storeUtils',
    './storeUtils/user.js'
  ]
};

/**
 * @command
 */

/**
 * normalize the builders.
 * If passed a string it will convert into array
 * if passed a array it will return the array
 * else it will return null
 *
 * @param {string | string[]} buildersUnsafe - builder you are going to create
 * @returns {string[]} - array of builders
 */
const cleanBuilders = buildersUnsafe => {
  if (is.string(buildersUnsafe)) {
    return [buildersUnsafe];
  }

  if (is.array(buildersUnsafe)) {
    return buildersUnsafe;
  }

  return null;
};

/**
 * Make a new list of create builders form an existing builder array.
 * This is a helper to help test `use` and `create` at the same time.
 *
 * @param {string[]} - builders
 * @returns {string[]} - array of builders with `-create` appended to the end of it
 */
const makeCreateBuilders = builders => {
  return !is.array(builders) ? null : builders.map(build => `${build}-create`);
};

/**
 * Convert builders into a string.
 *
 * @param {string[]} - builders
 * @returns {string} - string of all builders
 */
const makeBuildersString = builders => {
  return !is.array(builders) ? '' : builders.join(' ');
};

export const mockTemplateFileExistsError = (
  cwd,
  buildersUnsafe = null,
  file
) => {
  expect(cwd).toBeDirectory();
  const builders = cleanBuilders(buildersUnsafe);

  const hasBuilders = is.array(builders);

  if (!hasBuilders) {
    /**
     * If no builders then template was build in cwd so mock the file in cwd
     */
    return fs.outputFileSync(path.join(cwd, file), 'TPS_FILE_CONTENTS_MOCK');
  }

  const createBuilders = makeCreateBuilders(builders);
  const allBuilders = [...builders, ...createBuilders].map(builder =>
    path.join(cwd, builder, file)
  );

  return allBuilders.forEach(buldPath => {
    fs.outputFileSync(buldPath, 'TPS_FILE_CONTENTS_MOCK');
    expect(buldPath).toBeFile();
  });
};

export const checkFilesForTemplate = (cwd, buildersUnsafe, templateSpec) => {
  const builders = cleanBuilders(buildersUnsafe);
  const hasBuilders = is.array(builders);

  expect(cwd).toBeDirectory();

  if (!hasBuilders && templateSpec) {
    return expect(cwd).toHaveAllFilesAndDirectories(templateSpec);
  }

  const allBuilders = [...builders, ...makeCreateBuilders(builders)];

  expect(allBuilders).toHaveLength(builders.length * 2);

  allBuilders
    .map(builder => path.join(cwd, builder))
    .forEach(builder => {
      expect(builder).toBeDirectory();
      if (templateSpec) {
        expect(builder).toHaveAllFilesAndDirectories(templateSpec);
      }
    });
};

export const createTemplate = (
  cwd,
  template,
  buildersUnsafe = null,
  flags = {},
  opts = {}
) => {
  const templateSpec = templateSpecs[template];
  const useFlags = buildFlags(flags);
  const createFlags = buildFlags({ use: template, ...flags });
  const builders = cleanBuilders(buildersUnsafe);
  const hasBuilders = is.array(builders);
  const createBuilders = makeCreateBuilders(builders);
  const createBuildersString = makeBuildersString(createBuilders);
  const builderString = makeBuildersString(builders);

  expect(cwd).toBeDirectory();

  const commandPromises = [
    /* use */
    tpsCli(`${template} ${useFlags} ${builderString}`, {
      ...opts,
      cwd
    })
  ];

  if (hasBuilders) {
    /**
     * If there are no builders then we cannot
     * create duplicate templates in the same folder
     * so we only run the use command
     */
    commandPromises.push(
      /* create */
      tpsCli(`create ${createFlags} ${createBuildersString}`, {
        ...opts,
        cwd
      })
    );
  }

  return Promise.all(commandPromises).then(([use]) => {
    checkFilesForTemplate(cwd, builders, templateSpec);

    return Promise.resolve(use);
  });
};
