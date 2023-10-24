/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@tps/templates';
import path from 'path';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('yargs-cli-cmd', () => {
	let tps: Templates;

	beforeAll(() => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(() => {
		tps = new Templates('yargs-cli-cmd', {
			tpsPath: path.join(__dirname, '../../../.tps'),
			default: true,
		});

		return playground.createBox('yargs-cli-cmd');
	});

	it('should be able to render a new instance', async () => {
		await tps.render(playground.box(), 'publish');

		// @ts-expect-error no types for extending jest functions
		expect(playground.pathTo('publish.js')).toBeFile();
	});

	it('should be able ', async () => {
		await tps.render(playground.box(), 'publish');

		// @ts-expect-error no types for extending jest functions
		expect(playground.pathTo('publish.js')).toBeFile();
	});
});
