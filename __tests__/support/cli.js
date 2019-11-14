import { tpsCli, buildFlags } from '@test/utilities/helpers';
import { INIT_PACKAGE_FILES } from '@test/utilities/constants';
import path from 'path';
import is from 'is';

/**
 * @command init
 */
export const init = (cwd, flags = {}, opts = {}) => {
  const tpsFolder = path.join(cwd, '.tps');
  const flagString = buildFlags(flags);

  expect(cwd).toBeDirectory();

  return tpsCli(`init ${flagString}`, { cwd: cwd, ...opts }).then(stdout => {
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
export const createTemplate = (cwd, template, builders = null, flags = {}) => {
  const useFlags = buildFlags(flags);
  const createFlags = buildFlags({ use: template, ...flags });
  const hasBuilders = is.array(builders);

  if (is.string(builders)) {
    builders = [builders];
  }

  const createBuilders =
    hasBuilders && builders.map(build => `${build}-create`);
  const createBuildersString = createBuilders && createBuilders.join(' ');

  const builderString = hasBuilders ? builders.join(' ') : '';

  const templateSpec = templateSpecs[template];

  if (!templateSpec) {
    throw new Error('No template spec to match against');
  }

  const commandPromises = [
    /* use */
    tpsCli(`${template} ${useFlags} ${builderString}`, {
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
        cwd
      })
    );
  }

  return Promise.all(commandPromises).then(([use, create]) => {
    console.log(use);
    console.log('\n------------\n');
    console.log(create);
    if (hasBuilders) {
      const allBuilders = [...builders, ...createBuilders];

      allBuilders
        .map(builder => path.join(cwd, builder))
        .forEach(builder => {
          expect(builder).toBeDirectory();
          expect(builder).toHaveAllFilesAndDirectories(templateSpec);
        });
    } else {
      expect(cwd).toHaveAllFilesAndDirectories(templateSpec);
    }

    return Promise.resolve(use);
  });
};
