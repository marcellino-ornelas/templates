import { buildFlags } from '@test/utilities/helpers';
import { tpsCli } from '@test/utilities/tps-cli';
import { INIT_PACKAGE_FILES } from '@test/utilities/constants';
import * as path from 'path';
import * as is from 'is';
import * as fs from 'fs-extra';
import * as TPS from '@tps/utilities/constants';

/**
 * @command init
 */
export const init = (cwd, flags = {}, opts = {}) => {
  const tpsFolder = path.join(cwd, '.tps');
  const flagString = buildFlags(flags);

  expect(cwd).toBeDirectory();

  // if (flags.global) {
  //   expect(TPS.GLOBAL_PATH).not.toBeDirectory();
  // }
  const message = flags.global
    ? 'tps globally initialized'
    : 'Repo initialized';

  return tpsCli(`init ${flagString}`, { cwd, ...opts }).then((stdout) => {
    expect(stdout).toContain(message);

    if (flags.global) {
      expect(TPS.GLOBAL_PATH).toBeDirectory();
      expect(TPS.GLOBAL_PATH).toHaveAllFilesAndDirectories(INIT_PACKAGE_FILES);
    } else {
      expect(tpsFolder).toBeDirectory();
      expect(tpsFolder).toHaveAllFilesAndDirectories(INIT_PACKAGE_FILES);
    }
  });
};

/**
 * @command new
 */
export const newTemplate = (cwd, template) => {
  const testTemplatePath = path.join(cwd, `.tps/${template}`);
  const testTemplateDefault = path.join(testTemplatePath, 'default');
  const gitKeepFile = path.join(testTemplateDefault, '.gitkeep');

  expect(testTemplateDefault).not.toBeDirectory();

  return tpsCli(`new template ${template}`, { cwd }).then(() => {
    expect(testTemplateDefault).toBeDirectory();
    expect(`${testTemplatePath}/settings.json`).toBeFile();
    expect(gitKeepFile).not.toBeFile();
  });
};

const templateSpecs = {
  testing: [
    './index.js',
    './db',
    './db/db.js',
    './server',
    './storeUtils',
    './storeUtils/user.js',
  ],
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
const cleanBuilders = (buildersUnsafe) => {
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
const makeCreateBuilders = (builders) => {
  return !is.array(builders)
    ? null
    : builders.map((build) => `${build}-create`);
};

/**
 * Convert builders into a string.
 *
 * @param {string[]} - builders
 * @returns {string} - string of all builders
 */
const makeBuildersString = (builders) => {
  return !is.array(builders) ? '' : builders.join(' ');
};

export const DEFAULT_FILE_CONTENT = 'TPS_FILE_CONTENTS_MOCK';

export const mockTemplateFileExistsError = (
  cwd,
  buildersUnsafe = null,
  file,
  contents = DEFAULT_FILE_CONTENT
) => {
  expect(cwd).toBeDirectory();
  const builders = cleanBuilders(buildersUnsafe);

  const hasBuilders = is.array(builders);

  if (!hasBuilders) {
    /**
     * If no builders then template was build in cwd so mock the file in cwd
     */
    return fs.outputFileSync(path.join(cwd, file), contents);
  }

  const createBuilders = makeCreateBuilders(builders);
  const allBuilders = [...builders, ...createBuilders].map((builder) =>
    path.join(cwd, builder, file)
  );

  return allBuilders.forEach((buldPath) => {
    fs.outputFileSync(buldPath, contents);
    expect(buldPath).toBeFile();
  });
};

export const checkFilesForTemplate = (
  cwd,
  buildersUnsafe,
  templateSpec,
  flags = {}
) => {
  const builders = cleanBuilders(buildersUnsafe);
  const hasBuilders = is.array(builders);

  expect(cwd).toBeDirectory();

  if (!hasBuilders && templateSpec) {
    return expect(cwd).toHaveAllFilesAndDirectories(templateSpec);
  }

  const allBuilders = [...builders, ...makeCreateBuilders(builders)];

  expect(allBuilders).toHaveLength(builders.length * 2);

  allBuilders
    .map((builder) => path.join(cwd, builder))
    .forEach((buildPath) => {
      let pathToCheckForTemplateCreated = buildPath;
      if (flags && flags.newFolder === false) {
        /**
         * If the user used no new folder we need to check that
         * the files are in the parent dir of the buildPath
         */
        pathToCheckForTemplateCreated = path.dirname(buildPath);
      }

      expect(pathToCheckForTemplateCreated).toBeDirectory();
      if (templateSpec) {
        expect(pathToCheckForTemplateCreated).toHaveAllFilesAndDirectories(
          templateSpec
        );
      }
    });
};

export const checkFilesContentForTemplate = (
  cwd,
  buildersUnsafe,
  file,
  content
) => {
  const builders = cleanBuilders(buildersUnsafe);
  const hasBuilders = is.array(builders);

  expect(cwd).toBeDirectory();

  if (!hasBuilders) {
    return expect(path.join(cwd, file)).toHaveFileContents(content);
  }

  const allBuilders = [...builders, ...makeCreateBuilders(builders)];

  expect(allBuilders).toHaveLength(builders.length * 2);

  allBuilders
    .map((builder) => path.join(cwd, builder, file))
    .forEach((builtFile) => {
      expect(builtFile).toHaveFileContents(content);
    });
};

/**
 * Note: Testing newFolder flag requires to use the `testing-opt-new-flag`
 */
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
      cwd,
    }),
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
        cwd,
      })
    );
  }

  return Promise.all(commandPromises).then(([use]) => {
    checkFilesForTemplate(cwd, builders, templateSpec, flags);

    return Promise.resolve(use);
  });
};
