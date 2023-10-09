import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import fs from 'fs';

jest.mock('fs');

/**
 * Templates testing tpsrc
 */
const playground = new Playground(TESTING_DIR);

describe('[Templates] options:', () => {
	beforeAll(() => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(async () => {
		await playground.createBox('options');
	});

	it('should prefer options from settings file vs defaults', async () => {
		const tps = new Templates('testing-options-settings-file');

		expect(tps.opts.newFolder).toBeFalsy();
	});

	it('should prefer user options over settings file', async () => {
		const tps = new Templates('testing-options-settings-file', {
			newFolder: true,
		});

		expect(tps.opts.newFolder).toBeTruthy();
	});
});
