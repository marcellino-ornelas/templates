const presets = [['@babel/env']];

const presetsProduction = [
  [
    '@babel/env',
    {
      node: 'current'
    }
  ]
];

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./'],
      alias: {
        '@tps': './src'
      }
    }
  ]
];

module.exports = { presets, plugins };
module.exports = {
  env: {
    development: {
      presets,
      plugins
    },
    production: {
      presets: presetsProduction,
      plugins
    }
  }
};
