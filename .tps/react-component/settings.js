// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
  prompts: [
    {
      name: 'extention',
      aliases: ['e', 'ext'],
      type: 'input',
      tpsType: 'data',
      message: 'What type of extention do you want for your component?',
      default: 'js',
    },
    {
      name: 'css',
      aliases: ['c'],
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include a css file?',
      default: true,
    },
    {
      name: 'cssType',
      aliases: ['z'],
      tpsType: 'data',
      type: 'input',
      message: 'What type of css extention would you like?',
      when: (answers) => {
        return !!answers.css;
      },
      default: 'css',
    },
    {
      name: 'test',
      aliases: ['t'],
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include unit tests?',
      default: false,
    },
    {
      name: 'testType',
      aliases: ['y'],
      tpsType: 'data',
      type: 'input',
      message: 'What type of test extention would you like?',
      when: (answers) => {
        return !!answers.test;
      },
      default: 'test.js',
    },
    {
      name: 'index',
      aliases: ['i'],
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include a index file?',
      default: true,
    },
  ],
};
