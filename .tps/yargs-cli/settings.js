module.exports = {
  prompts: [
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
