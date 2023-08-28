/**
 * Modules
 */
import * as is from 'is';
import { eachObj } from '@tps/utilities/helpers';
import fs from 'fs';
import path from 'path';

/**
 * Constants
 */

const getFlagString = (flag) => `${flag.length === 1 ? `-` : `--`}${flag}`;

export const buildFlags = (args) => {
  let flags = '';

  if (!is.object(args)) {
    return flags;
  }

  eachObj(args, (value, flag) => {
    const flagString = getFlagString(flag);
    switch (true) {
      case is.boolean(value):
        // use getFlagString again here because we need to append the -- to the no option here
        flags += getFlagString(`${value === false ? 'no-' : ''}${flag}`);
        break;
      case is.string(value) || is.number(value):
        flags += `${flagString} ${value}`;
        break;
      case is.array(value):
        flags += `${flagString} ${value.join(' ')} --`;
        break;
      default:
        break;
    }

    flags += ' ';
  });

  return flags;
};

export const writeFile = (file, contents) => {
  const { dir } = path.parse(file);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(file, contents);
};
