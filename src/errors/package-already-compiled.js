export default class PackageAlreadyCompiledError extends Error {
  constructor(packageName) {
    super();
    this.name = 'PackageAlreadyCompiledError';
    this.message = `Package (${packageName}) was already compiled`;
  }
}
