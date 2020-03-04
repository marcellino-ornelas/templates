module.exports = {
  prompts: [
    {
      name: 'test_filter',
      type: 'input',
      tpsType: 'data',
      filter: answer => {
        return answer + '__filtered';
      },
      default: 'EMPTY'
    }
  ]
};
