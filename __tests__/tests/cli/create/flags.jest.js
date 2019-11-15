/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import {
  createTemplate,
  mockTemplateFileExistsError,
  checkFilesForTemplate
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
      'App',
      { d: true }
    );
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
      });
  });

  // it('should be able to use -f flag tell tps not to create a new folder', done => {
  //   const destPath = playground.pathTo('App');
  //   const cmd = ['create', '-f', '--use=testing', 'App'];

  //   utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
  //     expect(
  //       utils.hasAllFileAndDirs(destPath, [
  //         'extras.js',
  //         ...TESTING_PACKAGE_FILES
  //       ])
  //     ).toBeTruthy();

  //     done();
  //   });
  // });
});
