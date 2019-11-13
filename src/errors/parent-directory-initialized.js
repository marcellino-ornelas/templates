import { cliLog } from '@tps/utilities/helpers';

export default class ParentDirectoryInitializedError extends Error {
  constructor(parentTps) {
    super();
    this.name = 'ParentDirectoryInitializedError';
    this.tps = parentTps;
    this.message = cliLog(`\
      tps is already initialized in a parent directory.
      tps location: ${TPS.LOCAL_PATH}

      In order to initialize this folder add the --force flag
    `);
  }
}
