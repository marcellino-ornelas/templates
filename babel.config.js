const presets = [['@babel/env']];

const plugins = [
	[
		require.resolve('babel-plugin-module-resolver'),
		{
			root: ['./'],
			alias: {
				'@tps': './src',
				'@test': './__tests__',
			},
		},
	],
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-proposal-private-methods',
];

module.exports = { presets, plugins };
