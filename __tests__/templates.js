import Templates from '@tps/templates';
import * as path from 'path';
import { TPS_FOLDER } from '@tps/utilities/constants';

export default class TemplateOverride extends Templates {
  constructor(use, opts = {}) {
    super(use, {
      tpsPath: path.join(__dirname, TPS_FOLDER),
      ...opts,
    });
  }
}
