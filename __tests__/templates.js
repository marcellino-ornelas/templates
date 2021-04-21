import Templates from '@tps/templates';
import path from 'path';
import { TPS_FOLDER } from '@tps/utilities/constants';
import MemoryFileSystem from 'memory-fs-extra';

export default class TemplateOverride extends Templates {
  constructor(use, opts) {
    super(use, {
      tpsPath: path.join(__dirname, TPS_FOLDER),
      ...opts,
    });
  }
}
