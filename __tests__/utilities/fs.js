import MemoryFileSystem from 'memory-fs-extra';

const fs = new MemoryFileSystem({});

fs.outputFileSync('/hey/bad.txt', 'blah');

console.log(fs);

export default fs;
