module.exports = {
  prompts: [
    {
      name: 'css',
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include a css file?',
      default: true,
    },
    {
      name: 'cssType',
      tpsType: 'data',
      type: 'list',
      message: 'What type of css file would you like?',
      choices: ['css', 'scss', 'less'],
      when: (answers) => {
        console.log(answers);
        return !!answers.css;
      },
      default: 'css',
    },
    {
      name: 'test',
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include unit tests?',
      default: true,
    },
    {
      name: 'index',
      type: 'confirm',
      tpsType: 'package',
      message: 'Would you like to include a index file?',
      default: true,
    },
  ],
};
