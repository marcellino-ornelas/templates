// @ts-check

/** @type {import('./../../src/types/settings').SettingsFile} */
module.exports = {
  prompts: [
    {
      name: 'type',
      type: 'list',
      tpsType: 'package',
      message: 'What type of file style do you want to use?',
      choices: [
        {
          name: 'Named Export',
          value: 'namedExport',
        },
        {
          name: 'Default Export',
          value: 'defaultExport',
        },
      ],
      default: false,
    },
    {
      name: 'typescript',
      type: 'confirm',
      tpsType: 'data',
      message: 'Would you like to use typescript',
      default: false,
    },
    {
      name: 'extension',
      aliases: ['e', 'ext', 'extention'],
      type: 'input',
      tpsType: 'data',
      message: 'What type of extension do you want for your file?',
      default: (answers) => {
        if (answers.typescript) return 'ts';
        return 'js';
      },
    },
    {
      name: 'description',
      aliases: ['desc'],
      type: 'input',
      tpsType: 'data',
      message: 'Please add a description',
      default: '...',
    },
  ],
};
