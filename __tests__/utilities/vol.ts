import { Volume } from 'memfs';
import { Volume as _Volume } from 'memfs/lib/volume';
import templateFiles from '@test/templates.json';

export const vol = new Volume();

const DEFAULT_FILES = {
  [`${process.cwd()}/readme.md`]: '',
  ...templateFiles,
};

vol.fromJSON({
  [`${process.cwd()}/readme.md`]: '',
  [`${process.cwd()}/__tests__/readme.md`]: '',
  ...DEFAULT_FILES,
});
