/**
 * Inspired from hey-api/openapi-ts
 * https://github.com/hey-api/openapi-ts/blob/main/packages/openapi-ts/src/index.ts
 */
import { sync } from 'cross-spawn';

type OutputProcessor = {
	args: (paths: string[]) => ReadonlyArray<string>;
	command: string;
	name: string;
};

/**
 * Map of supported formatters
 */
export const formatters = {
	biome: {
		args: (paths) => ['format', '--write', ...paths],
		command: 'biome',
		name: 'Biome (Format)',
	},
	prettier: {
		args: (paths) => [
			'--ignore-unknown',
			...paths,
			'--write',
			'--ignore-path',
			'./.prettierignore',
		],
		command: 'prettier',
		name: 'Prettier',
	},
} as const satisfies Record<string, OutputProcessor>;

/**
 * Map of supported linters
 */
export const linters = {
	biome: {
		args: (paths) => ['lint', '--apply', ...paths],
		command: 'biome',
		name: 'Biome (Lint)',
	},
	eslint: {
		args: (paths) => [...paths, '--fix'],
		command: 'eslint',
		name: 'ESLint',
	},
} as const satisfies Record<string, OutputProcessor>;

export const runCommand = (module: OutputProcessor, paths: string[]): void => {
	console.log(`✨ Running ${module.name}`);
	const result = sync(module.command, module.args(paths));

	const isError = result.status > 0;

	if (isError) {
		console.log(`❌ ${module.name} failed!`);
		console.log(result.stdout.toString());
		console.log(result.stderr.toString());
	}
};
