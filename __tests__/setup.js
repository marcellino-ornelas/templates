import { isFile, isDir } from '@tps/utilities/fileSystem';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as pjson from 'prettyjson-256';
import { DirectoryNode } from '@tps/fileSystemTree';

jest.setTimeout(30000);

expect.extend({
  toBeFile(received) {
    const passed = isFile(received);
    const receivedAfterPrint = this.utils.printReceived(received);

    if (passed) {
      return {
        pass: true,
        message: () => `${receivedAfterPrint} should not be a file.`,
      };
    }
    return {
      pass: false,
      message: () => `${receivedAfterPrint} should be a file.`,
    };
  },
  toBeDirectory(received) {
    const passed = isDir(received);
    const receivedAfterPrint = this.utils.printReceived(received);

    if (passed) {
      return {
        pass: true,
        message: () => `${receivedAfterPrint} should not be a directory.`,
      };
    }
    return {
      pass: false,
      message: () => `${receivedAfterPrint} should be a directory.`,
    };
  },
  toHaveAllFilesAndDirectories(dirPath, filesAndDirs = []) {
    const receivedAfterPrint = this.utils.printReceived(dirPath);
    const isReg = !this.isNot;
    let count = 0;
    const files = [];

    for (let i = 0; i < filesAndDirs.length; i++) {
      const fileOrDir = filesAndDirs[i];
      const pathToFile = path.join(dirPath, fileOrDir);
      const isFileLike = isDir(pathToFile) || isFile(pathToFile);
      if (isFileLike === isReg) {
        count += 1;
      } else {
        files.push(fileOrDir);
      }
    }

    const didMatchLen = count === filesAndDirs.length;
    const dirPathLayout = new DirectoryNode(dirPath).toObject();

    if (didMatchLen) {
      // passed
      return {
        pass: !this.isNot,
        message: () => `\
${receivedAfterPrint} had these files/directories

${files.map((file, index) => `${index + 1}.) ${file}\n`)}
`,
      };
    }
    return {
      pass: !!this.isNot,
      message: () => `\
${receivedAfterPrint} did not have files/directories

${files.map((file, index) => `${index + 1}.) ${file}\n`)}


Directory Layout:
${pjson.render(dirPathLayout)}
`,
    };
  },
  toHaveFileContents(destPath, contents = '') {
    const fileContents = fs.readFileSync(destPath).toString();
    const receivedAfterPrint = this.utils.printReceived(destPath);
    const expected = this.utils.printExpected(contents);

    const passed = fileContents.includes(contents);

    const options = {
      isNot: this.isNot,
      promise: this.promise,
    };

    if (passed) {
      return {
        pass: true,
        message: () => `
${this.utils.matcherHint(
  'not.toHaveFileContents',
  receivedAfterPrint,
  contents,
  options
)}

File should not have contents: ${expected}

Received: ${this.utils.printReceived(fileContents)}
`,
      };
    }
    return {
      pass: false,
      message: () => `
${this.utils.matcherHint(
  'toHaveFileContents',
  receivedAfterPrint,
  contents,
  options
)}

File should have contents: ${expected}

Received: ${this.utils.printReceived(fileContents)}
`,
    };
  },
});
