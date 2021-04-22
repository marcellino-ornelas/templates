import Templates from '@tps/templates';
import path from 'path';
import FileSystemNode from '../src/fileSystemTree/fileSystemNode';
import { TPS_FOLDER } from '@tps/utilities/constants';
import fs from './utilities/fs';

FileSystemNode.fs = fs;

export default class TemplateOverride extends Templates {
  constructor(use, opts) {
    super(use, {
      tpsPath: path.join(__dirname, TPS_FOLDER),
      ...opts,
    });

    this.fs = fs;
  }
}
