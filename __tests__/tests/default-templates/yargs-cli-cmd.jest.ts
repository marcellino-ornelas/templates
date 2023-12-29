/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@tps/templates';
import path from 'path';
import { reset, vol } from '@test/utilities/vol';

jest.mock('fs');
jest.mock('fs/promises');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('yargs-cli-cmd', () => {
	let tps: Templates;

	// beforeAll(() => playground.create());
	// afterAll(() => playground.destroy());

	beforeEach(() => {
		// reset();

		tps = new Templates('yargs-cli-cmd', {
			tpsPath: path.join(__dirname, '../../../.tps'),
			default: true,
		});

		return playground.createBox('yargs-cli-cmd');
	});

	afterEach(() => {
		reset();
	});

	it('should be able to render a new instance', async () => {
		await tps.render(playground.box(), 'publish');

		// @ts-expect-error no types for extending jest functions
		expect(playground.pathTo('publish.js')).toBeFile();
	});

	describe('Prompt: type', () => {
		it('should be able to use named export syntax', async () => {
			tps.setAnswers({
				type: 'namedExport',
			});

			await tps.render(playground.box(), 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(playground.pathTo('publish.js')).toHaveFileContents(`\
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

			await tps.render(playground.box(), 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(playground.pathTo('publish.js')).toHaveFileContents(`\
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

			await tps.render(playground.box(), 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(playground.pathTo('publish.ts')).toHaveFileContents(`\
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

			await tps.render(playground.box(), 'publish');

			// @ts-expect-error no types for extending jest functions
			expect(playground.pathTo('publish.ts')).toHaveFileContents(`\
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
