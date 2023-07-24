// eslint-disable-next-line import/no-extraneous-dependencies
const Templates = require('templates-mo');

module.exports = function friendsPlugin(context, options) {
  return {
    name: 'templates-plugin',
    async loadContent() {
      console.log('hey', Templates);
      return {};
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData, addRoute } = actions;
      setGlobalData({ templates: ['Yangshun', 'Sebastien'] });
    },
  };
};
