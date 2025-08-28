/*
 * Modules
 */
import Templates from '@tps/templates';
import path from 'path';
import { reset, vol } from '@test/utilities/vol';
import { CWD, USER_HOME } from '@tps/utilities/constants';

jest.mock('fs');

jest.mock('@tps/utilities/constants', () => {
	const original = jest.requireActual('@tps/utilities/constants');
	return {
		...original,
		CWD: jest
			.requireActual('path')
			.join(original.USER_HOME, 'Desktop', 'random'),
	};
});

describe('yargs-cli-cmd', () => {
	let tps: Templates;

	beforeEach(async () => {
		reset();

		await vol.promises.mkdir(path.join(USER_HOME, 'Desktop', 'random'), {
			recursive: true,
		});

		tps = await Templates.get('yargs-cli-cmd', {
			default: true,
		});
	});

	it('should be able to render a new instance', async () => {
		await tps.render(CWD, 'publish');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'publish.js')).toBeFile();
	});

	describe('Prompt: type', () => {
		it('should be able to use named export syntax', async () => {
			tps.setAnswers({
				type: 'namedExport',
			});

			await tps.render(CWD, 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'publish.js')).toHaveFileContents(`\
export const command = 'publish';

export const aliases = [];

export const describe = "...";

export const builder = {
    flag: {
        alias: '',
        describe: '...',
        type: 'boolean',
    },
};

export const handler = async (argv) => {
    // code ...
};
`);
		});

		it('should be able to use named export syntax', async () => {
			tps.setAnswers({
				type: 'defaultExport',
			});

			await tps.render(CWD, 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'publish.js')).toHaveFileContents(`\
export default {
    command: 'publish',
    aliases: [],
    describe: "...",
    builder: {
        flag: {
            alias: '',
            describe: '...',
            type: 'boolean',
        },
    },
    async handler(argv) {
        // code ...
    },
};
`);
		});
	});

	describe('Prompt: typescript', () => {
		it('should be able to use typescript with default export', async () => {
			tps.setAnswers({
				type: 'defaultExport',
				typescript: true,
			});

			await tps.render(CWD, 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'publish.ts')).toHaveFileContents(`\
import { CommandModule } from 'yargs';

interface PublishArgv {
    flag: boolean;
}

export default {
    command: 'publish',
    aliases: [],
    describe: "...",
    builder: {
        flag: {
            alias: '',
            describe: '...',
            type: 'boolean',
        },
    },
    async handler(argv) {
        // code ...
    },
} as CommandModule<object, PublishArgv>;
`);
		});

		it('should be able to use typescript with default export', async () => {
			tps.setAnswers({
				type: 'namedExport',
				typescript: true,
			});

			await tps.render(CWD, 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'publish.ts')).toHaveFileContents(`\
import { CommandModule } from 'yargs';

interface PublishArgv {
    flag: boolean;
}

type PublishModule = CommandModule<object, PublishArgv>;

export const command: PublishModule['command'] = 'publish';

export const aliases: PublishModule['aliases'] = [];

export const describe: PublishModule['describe'] = "...";

export const builder: PublishModule['builder'] = {
    flag: {
        alias: '',
        describe: '...',
        type: 'boolean',
    },
};

export const handler: PublishModule['handler'] = async (argv) => {
    // code ...
};
`);
		});
	});
});
