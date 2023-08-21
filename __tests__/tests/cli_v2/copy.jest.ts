import fs from 'fs-extra';
import yargs from 'yargs/yargs';
import Templates from '@tps/templates';
import copy from '@tps/cli/commands/copy';
import { isDir, json } from '@tps/utilities/fileSystem';
import {
  createFs,
  reset,
  init,
  mkTemplate,
  loadDefaultTemplates,
} from '@test/utilities/cli_v2';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, jest, describe, it } from '@jest/globals';

jest.mock('@tps/utilities/fileSystem', () => {
  return {
    // ...jest.requireActual<object>('@tps/utilities/fileSystem'),
    isDir: jest.fn(),
    json: jest.fn(),
  };
});

jest.mock('fs-extra', () => {
  return {
    __esModule: true,
    default: {
      readdirSync: jest.fn(),
    },
    readdirSync: jest.fn(),
  };
});

const vol = createFs();

jest
  .mocked(fs.readdirSync)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .mockImplementation((path, options) => {
    console.log('called', path);
    return vol.readdirSync(path, options);
  });

// jest.mocked(isDir, { shallow: true }).mockImplementation((path: string) => {
//   let dir;
//   try {
//     dir = vol.lstatSync(path);
//   } catch (e) {
//     return false;
//   }
//   return dir.isDirectory();
// });

// jest.mocked(json).mockImplementation((jsonFile) => {
//   try {
//     const jsonContents = vol.readFileSync(jsonFile).toString();
//     return JSON.parse(jsonContents);
//   } catch (err) {
//     return {};
//   }
// });

describe('Command Line: Copy', () => {
  beforeEach(() => {
    // log.reset();
    reset(vol);
  });

  it('should be able to copy a template', async () => {
    jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);
    jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    await init(vol, true);

    /**
     * Since the templates default packages are currently in
     * our local tps it wouldnt be possible to copy the template
     * since its in our local tps
     *
     * our hack is to add a global template and copy this one
     */
    mkTemplate(vol, 'global-template', undefined, true);

    // console.log(vol.toJSON());

    const hey = vol.lstatSync(
      '/Users/marcellinoornelas/.tps/global-template/default'
    );

    // console.log('isDir', hey.isDirectory());

    const parser = yargs().command(copy);

    await parser.parseAsync('copy global-template');

    // expect(vol).toContain(expect.objectContaining({

    // }))

    // const cwd = playground.box();
    // await init(cwd, { force: true });
    // return tpsCli('copy react-component', { cwd }).then(() => {
    //   expect(playground.pathTo('.tps/react-component')).toBeDirectory();
    // });
  });
  //   it('should be able to copy a template and add new name', async () => {
  //     const cwd = playground.box();
  //     await init(cwd, { force: true });
  //     return tpsCli('copy react-component new-name', { cwd }).then(() => {
  //       expect(playground.pathTo('.tps/new-name')).toBeDirectory();
  //     });
  //   });
  //   it('should error if template already exists', async () => {
  //     const cwd = playground.box();
  //     await init(cwd, { force: true });
  //     await newTemplate(cwd, 'react-component');
  //     await expect(
  //       tpsCli('copy react-component', { cwd, fail: true })
  //     ).rejects.toContain(
  //       `Template react-component already exists in your directory`
  //     );
  //   });
  //   it('should error if name already exists', async () => {
  //     const cwd = playground.box();
  //     await init(cwd, { force: true });
  //     await newTemplate(cwd, 'new-name');
  //     await expect(
  //       tpsCli('copy react-component new-name', { cwd, fail: true })
  //     ).rejects.toContain(`Template new-name already exists in your directory`);
  //   });
  //   it('should error if not initialized', () => {
  //     const cwd = playground.box();
  //     return expect(
  //       tpsCli('copy react-component', { cwd, fail: true })
  //     ).rejects.toContain('Directory must be initialized with templates');
  //   });
});
