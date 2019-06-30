export default class SettingsUnkownFileTypeError extends Error {
  constructor(settingsPath) {
    super();
    this.name = 'TpsSettingsUnknownFileTypeError';
    this.settings = settingsPath;
    this.message = `\
Could not load settings file! Please make sure this file is a json or js file 
settings path: ${settingsPath}
`;
  }
}
