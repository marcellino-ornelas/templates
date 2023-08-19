// import * as fs from 'fs-extra';
import { Volume } from 'memfs';
import { Volume as _Volume } from 'memfs/lib/volume';
import { TESTING_DIR } from '@test/utilities/constants';
import { DirectoryNode, FileNode } from '@tps/fileSystemTree';
import fs from 'fs-extra';
import realPath from 'path';

// export const vol = Volume.fromJSON({
//   [process.cwd()]: '',
// });

const dir = new DirectoryNode('.tps', TESTING_DIR);

const DEFAULT_FILES = {
  [`${process.cwd()}/readme.md`]: '',
};

dir.find({ type: 'file' }).forEach((a: FileNode) => {
  const data = fs.readFileSync(a.path);
  DEFAULT_FILES[a.path] = data?.toString() ?? '';
});

export const createFs = (): _Volume => {
  const vol = new Volume();
  reset(vol);
  return vol;
};

export const reset = (vol: _Volume) => {
  vol.reset();
  vol.fromJSON(DEFAULT_FILES);
};

export const init = (vol: _Volume): Promise<void> => {
  return new Promise((resolve, reject) => {
    vol.mkdir('.tps/', (err, data) => {
      if (err) return reject(err);

      vol.writeFile('./.tps/.tpsrc', '{}', (_err) => {
        if (_err) return reject(_err);

        resolve();
      });
    });
  });
};

// (async () => {
//   const vol = createFs();
//   console.log(vol.toTree());
//   await init(vol);
//   console.log(vol.toTree());

//   vol.reset();
//   console.log(vol.toTree());
// })();

interface MockedConsole {
  original: typeof console.log;
  log: jest.SpyInstance;
  get: () => string;
  reset: () => void;
  revert: () => void;
}

export const mockConsoleLog = (): MockedConsole => {
  let logs = '';

  const original = console.log;

  const log = jest.spyOn(console, 'log').mockImplementation((...args) => {
    // eslint-disable-next-line prefer-template
    logs += args.map((a) => a.toString()).join(' ') + '\n';
  });

  return {
    original,
    log,
    get() {
      return logs;
    },
    reset() {
      logs = '';
    },
    revert() {
      log.mockRestore();
    },
  };
};
