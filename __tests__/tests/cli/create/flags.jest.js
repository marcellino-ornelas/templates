/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import {
  createTemplate,
  mockTemplateFileExistsError,
  checkFilesForTemplate,
  checkFilesContentForTemplate
} from '@test/support/cli';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('cli_create_flags'));

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

  it('should be able to use -p flag to all additional packages', () => {
    return createTemplate(playground.box(), 'testing', 'app', {
      packages: ['extras', 'extras2']
    }).then(() => {
      checkFilesForTemplate(playground.box(), 'app', [
        './extras2.js',
        './extras.js'
      ]);
    });
  });

  /**
   * @docs api/cli/commands/create.md#force-a-template-creation
   */
  it('should be able to use --force flag', () => {
    mockTemplateFileExistsError(playground.box(), 'app', './index.js');

    return expect(
      createTemplate(playground.box(), 'testing', 'app', null, { fail: true })
    )
      .rejects.toContain('FileExistError')
      .then(() => {
        return createTemplate(playground.box(), 'testing', 'app', {
          force: true
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

  it('should be able to use --wipe flag', () => {
    mockTemplateFileExistsError(playground.box(), 'app', './index.js');

    return createTemplate(playground.box(), 'testing', 'app', {
      wipe: true
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

  describe('should be able to use --no-newFolder flag', () => {
    const flags = {
      newFolder: false
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
