/**
 * Inspired from hey-api/openapi-ts
 * https://github.com/hey-api/openapi-ts/blob/main/packages/openapi-ts/src/index.ts
 */
import { sync } from 'cross-spawn';
import type { SettingsFilePrompt } from '@tps/types/settings';
import path from 'path';
import Templates from '@tps/templates';

const NONE = 'none';

type ExcludeNone<T extends string> = Exclude<T, typeof NONE>;

export type OutputProcessor = {
	args: (paths: string[]) => ReadonlyArray<string>;
	command: string;
	name: string;
};

type OutputProcessorMap<T extends string> = Record<
	ExcludeNone<T>,
	OutputProcessor
>;

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
	return (error as NodeJS.ErrnoException).code !== undefined;
}

export const FORMATTER_PROMPT = {
	name: 'formatter',
	aliases: ['format'],
	description:
		'Type of formatter you would like to use to format the component',
	message: 'What type of formatter do you want to use to format your code',
	type: 'list',
	tpsType: 'data',
	hidden: true,
	choices: [NONE, 'prettier', 'biome'],
	default: NONE,
} as const satisfies SettingsFilePrompt;

export type formatters = (typeof FORMATTER_PROMPT.choices)[number];

/**
 * Map of supported formatters
 */
const formattersMap: OutputProcessorMap<formatters> = {
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
};

export const runFormatter = async (
	formatter: formatters,
	cwd: string,
	paths: string[],
	tps?: Templates,
): Promise<void> => {
	if (formatter === NONE) {
		return;
	}

	const formatterObj = formattersMap[formatter] ?? null;

	if (formatterObj) {
		runCommand(formatterObj, cwd, paths, tps);
	}
};

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

export const runCommand = (
	module: OutputProcessor,
	cwd: string,
	paths: string[],
	tps: Templates = null,
): void => {
	console.log(`✨ Running ${module.name}`);

	const templatesNodeModulesBin = path.resolve(
		__dirname,
		'../../',
		'node_modules',
		'.bin',
	);

	// TODO: Use find up
	const destNodeModulesBin = path.resolve(cwd, 'node_modules', '.bin');

	const templateNodeModuleBin = tps
		? [path.resolve(tps.src, 'node_modules', '.bin')]
		: [];

	const bins = [
		// Bins from main template directory which satisfies default templates
		templatesNodeModulesBin,
		// Bins from Modules from the `cwd` or in other words `dest`
		destNodeModulesBin,
		// Bins from template modules
		...templateNodeModuleBin,
		process.env.PATH,
	];

	const envPath = bins.join(':');

	const result = sync(module.command, module.args(paths), {
		env: { ...process.env, PATH: envPath },
	});

	if (result?.error) {
		const { error } = result;

		if (isErrnoException(error)) {
			if (error.code === 'ENOENT') {
				console.log(`❌ Command not found: ${module.command}`);
				return;
			}
		}

		console.log(`❌ ${module.name} failed!`);
		console.log(error);
	} else if (result?.status > 0) {
		// command error
		console.log(`❌ ${module.name} failed!`);
		console.log(result.stdout.toString());
		console.log(result.stderr.toString());
	}
};

export const packageManagers = {
	npm: {
		args: (paths) => ['install', '--prefix', ...paths],
		command: 'npm',
		name: 'Npm Install',
	},
	yarn: {
		args: (paths) => ['install', '--cwd', ...paths],
		command: 'yarn',
		name: 'Yarn Install',
	},
} as const satisfies Record<string, OutputProcessor>;
