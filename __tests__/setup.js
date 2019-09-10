import { isFile, isDir } from '@tps/utilities/fileSystem';
import path from 'path';
import fs from 'fs-extra';

jest.setTimeout(30000);

expect.extend({
  toBeFile(received) {
    const passed = isFile(received);
    const _received = this.utils.printReceived(received);

    if (passed) {
      return {
        pass: true,
        message: () => `${_received} should not be a file.`
      };
    } else {
      return {
        pass: false,
        message: () => `${_received} should be a file.`
      };
    }
  },
  toBeDirectory(received) {
    const passed = isDir(received);
    const _received = this.utils.printReceived(received);

    if (passed) {
      return {
        pass: true,
        message: () => `${_received} should not be a directory.`
      };
    } else {
      return {
        pass: false,
        message: () => `${_received} should be a directory.`
      };
    }
  },
  toHaveAllFilesAndDirectories(dirPath, filesAndDirs = []) {
    const _received = this.utils.printReceived(dirPath);
    const isReg = !this.isNot;
    let count = 0;
    let files = [];

    for (let i = 0; i < filesAndDirs.length; i++) {
      const fileOrDir = filesAndDirs[i];
      const pathToFile = path.join(dirPath, fileOrDir);
      const isFileLike = isDir(pathToFile) || isFile(pathToFile);
      if (isFileLike === isReg) {
        count++;
      } else {
        files.push(fileOrDir);
      }
    }

    const didMatchLen = count === filesAndDirs.length;

    if (didMatchLen) {
      // passed
      return {
        pass: this.isNot ? false : true,
        message: () => `\
${_received} had these files/directories

${files.map((file, index) => `${index + 1}.) ${file}\n`)}
`
      };
    } else {
      return {
        pass: this.isNot ? true : false,
        message: () => `\
${_received} did not have files/directories

${files.map((file, index) => `${index + 1}.) ${file}\n`)}
`
      };
    }
  },
  toHaveFileContents(destPath, contents = '') {
    const fileContents = fs.readFileSync(destPath).toString();
    const _received = this.utils.printReceived(destPath);
    const _expected = this.utils.printExpected(contents);

    const passed = contents === fileContents;

    const options = {
      isNot: this.isNot,
      promise: this.promise
    };

    if (passed) {
      return {
        pass: true,
        message: () => `
${this.utils.matcherHint('not.toHaveFileContents', destPath, contents, options)}

File should not have contents: ${_expected}

Received: ${this.utils.printReceived(fileContents)}
`
      };
    } else {
      return {
        pass: false,
        message: () => `
${this.utils.matcherHint('toHaveFileContents', destPath, contents, options)}

File should have contents: ${_expected}

Received: ${this.utils.printReceived(fileContents)}
`
      };
    }
  }
});
