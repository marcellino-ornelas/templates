/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import path from 'path';
import fs from 'fs-extra';
import { TESTING_DIR } from '@test/utilities/constants';
import {
  createTemplate,
  mockTemplateFileExistsError,
  checkFilesForTemplate,
  checkFilesContentForTemplate,
  forEachBuilder,
} from '@test/support/cli';

import { DirectoryNode } from '@tps/fileSystemTree';
/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

/**
 * @docs api/cli/commands/create.md#flags
 */
describe('[cli] Create:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('cli_create_flags'));

  /**
   * @docs api/cli/commands/create.md#force-a-template-to-be-created
   */
  it('should be able to use --force flag', () => {
    mockTemplateFileExistsError(playground.box(), 'app', './index.js');

    return expect(
      createTemplate(playground.box(), 'testing', 'app', null, { fail: true })
    )
      .rejects.toContain('FileExistError')
      .then(() => {
        return createTemplate(playground.box(), 'testing', 'app', {
          force: true,
        });
      })
      .then(() => {
        // we should check the file contents here
        checkFilesContentForTemplate(
          playground.box(),
          'app',
          './index.js',
          "console.log('hey');"
        );
      });
  });

  /**
   * @docs
   *  api/cli/commands/create.md#add-additional-packages
   *  guide/getting-started/packages.md#including-more-packages
   *
   */
  it('should be able to use -p flag to all additional packages', () => {
    return createTemplate(playground.box(), 'testing', 'app', {
      packages: ['extras', 'extras2'],
    }).then(() => {
      checkFilesForTemplate(playground.box(), 'app', [
        './extras2.js',
        './extras.js',
      ]);
    });
  });

  /**
   * @docs api/cli/commands/create.md#default
   */
  it('should be able to use -d flag to use all default prompt answers', () => {
    return createTemplate(
      playground.box(),
      'testing-prompt-types-select',
      'app',
      { d: true }
    ).then(() => {
      checkFilesForTemplate(playground.box(), 'app', ['./index.css']);
    });
  });

  /**
   * @docs api/cli/commands/create.md#wipe-a-template
   */
  describe('wipe', () => {
    it('should be able to override a file', () => {
      mockTemplateFileExistsError(playground.box(), 'app', './index.js');

      return createTemplate(playground.box(), 'testing', 'app', {
        wipe: true,
      }).then(() => {
        // we should check the file contents here
        checkFilesContentForTemplate(
          playground.box(),
          'app',
          './index.js',
          "console.log('hey');"
        );
      });
    });

    /**
     * This test was added because when using newFolder=false and using wipe and using a long build path.
     *
     */
    // it("should not throw error when files doesn't exist when using newFolder=false", () => {
    //   forEachBuilder('my/personal/app', (buildPath) => {
    //     console.log('build path', buildPath);
    //     expect(buildPath).not.toBeDirectory();
    //     const parentBuildPath = path.dirname(buildPath);
    //     const directoryToIndexFile = path.join(
    //       playground.box(),
    //       parentBuildPath
    //     );
    //     const indexFile = path.join(directoryToIndexFile, 'index.js');
    //     fs.ensureDirSync(directoryToIndexFile);
    //     fs.writeFileSync(indexFile, 'hey');
    //     expect(indexFile).toBeFile();
    //   });

    //   return createTemplate(
    //     playground.box(),
    //     'testing-basic',
    //     'my/personal/app',
    //     {
    //       wipe: true,
    //       verbose: true,
    //       newFolder: false,
    //     }
    //   ).then(() => {
    //     // we should check the file contents here
    //     checkFilesContentForTemplate(
    //       playground.box(),
    //       'my/personal/app',
    //       './index.js',
    //       'clean up worked'
    //     );
    //   });
    // });
  });

  /**
   * @docs api/cli/commands/create.md#create-a-template-without-a-new-folder
   */
  describe('should be able to use --no-newFolder flag', () => {
    const flags = {
      newFolder: false,
    };

    it('with one buildPath', () => {
      return createTemplate(
        playground.box(),
        'testing-opt-new-flag',
        'app',
        flags
      ).then(() => {
        checkFilesForTemplate(playground.box(), 'app', null, flags);
      });
    });

    it('with multiple buildPaths', () => {
      return createTemplate(
        playground.box(),
        'testing-opt-new-flag',
        ['app', 'nav'],
        flags
      ).then(() => {
        checkFilesForTemplate(playground.box(), ['app', 'nav'], null, flags);
      });
    });

    it.todo('should error out if no build Path is specified');
  });

  it.todo('should be able to use --name flag?');
});
