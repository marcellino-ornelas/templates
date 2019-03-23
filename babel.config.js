const presets = [['@babel/env']];

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
