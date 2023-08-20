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

jest.mock('fs-extra');
jest.mock('@tps/utilities/fileSystem', () => {
  return {
    ...jest.requireActual('@tps/utilities/fileSystem'),
    isDir: jest.fn(),
    json: jest.fn(),
  };
});

const vol = createFs();

describe('Command Line: Copy', () => {
  beforeEach(() => {
    // log.reset();
    reset(vol);

    jest.mocked(fs.readdirSync).mockImplementation(vol.readdirSync.bind(vol));
    jest.mocked(isDir).mockImplementation((path: string) => {
      let dir;
      try {
        dir = vol.lstatSync(path);
      } catch (e) {
        return false;
      }
      return dir.isDirectory();
    });

    jest.mocked(json).mockImplementation((jsonFile) => {
      try {
        const jsonContents = fs.readFileSync(jsonFile).toString();
        return JSON.parse(jsonContents);
      } catch (err) {
        return {};
      }
    });
  });

  it('should be able to copy a template', async () => {
    jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);
    jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

    // jest.mocked(fs.lstatSync).mockImplementation((...args) => {
    //   console.log('mocked', args);
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   return vol.lstatSync(...args);
    // });

    await init(vol, true);

    /**
     * Since the templates default packages are currently in
     * our local tps it wouldnt be possible to copy the template
     * since its in our local tps
     *
     * our hack is to add a global template and copy this one
     */
    mkTemplate(vol, 'global-template', undefined, true);

    console.log(vol.toJSON());

    const hey = vol.lstatSync(
      '/Users/marcellinoornelas/.tps/global-template/default'
    );

    console.log('isDir', hey.isDirectory());

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
