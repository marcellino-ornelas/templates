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
      // Create friends.json
      const friends = ['Yangshun', 'Sebastien'];

      setGlobalData({ templates: ['Yangshun', 'Sebastien'] });

      //   // Add the '/friends' routes, and ensure it receives the friends props
      //   addRoute({
      //     path: '/templates/friends',
      //     component: '@site/src/components/templateOptions.js',
      //     modules: {
      //       // propName -> JSON file path
      //       friends: friendsJsonPath,
      //     },
      //     exact: true,
      //   });
    },
  };
};
