import { createFsFromVolume } from 'memfs';
import { vol } from '../__tests__/utilities/vol';

console.log('mocking file system');

export default createFsFromVolume(vol);
